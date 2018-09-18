<?php

class DesktopModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function loadDesktop($argIdRol) {
        try {
            $mod_idroles = Funcionalidades::getModulos($argIdRol);
            foreach ($mod_idroles as &$mod) {
                $mod['menu'] = $this->recursiva($this->listaAdyacentes(0, $mod['idmodulo']));
            }
            return $mod_idroles;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataUser(Future_Post $post) {
        try {
            date_default_timezone_set('America/Havana');
            $currentDate = new DateTime();
            $fCurrentDate = $currentDate->format('d/m/Y');
            $objNotificacion = new Notificacion();
            $dataNotifications = $objNotificacion->updateNotifications($post, $this->dataSession);
            $this->dataSession->alldatauser->notificationsIni = $dataNotifications;
            $this->dataSession->alldatauser->identidad = $this->dataSession->identidad;
            $this->dataSession->alldatauser->identidad_padre = $this->dataSession->identidad_padre;
            $this->dataSession->alldatauser->entidad = $this->dataSession->desc_entidad;
            $this->dataSession->alldatauser->fechaActual = $fCurrentDate;
            $dr = $post->getServer('DOCUMENT_ROOT');
            $fileConfigSystem = $dr . "/comun/comun/xml/system.xml";
            $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
            $this->dataSession->alldatauser->sessiontime = ($xmlConfigSystem != false) ? (int) $xmlConfigSystem->blockadeuser->sessiontime : 900;
            $dataUser = $this->dataSession->alldatauser;
            return $dataUser;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function changePasswdUser(Future_Post $post) {
        try {
            $user = $this->dataSession->datuser;
            $objUsuarios = new Usuarios();
            $val = $objUsuarios->verificardatosuser($user, $post->pass);
            if ($val) {
                $objUsuariosModel = new UsuariosModel();
                $cambiarpass = $objUsuariosModel->cambiarContrasenna($user, $post->newpass);
                if ($cambiarpass) {
                    return 1;
                } else {
                    return 3;
                }
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadAparienceConfig() {
        $dataUser = $this->dataSession->alldatauser;
        return array('tema' => $dataUser->tema, 'idioma' => $dataUser->idioma);
    }

    public function loadLegalData() {
        try {
            $app_dir = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/license.xml';
            return simplexml_load_file($app_dir);
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    public function setAparienceConfig($post) {
        $objUmodel = new UsuariosModel();
        return $objUmodel->updateAparience($post);
    }

    private function listaAdyacentes($idpadre, $idmodulo) {
        $objFunct = new Funcionalidades();
        $functAsig = $objFunct->getFuncionalidadesRolService($this->dataSession->arridroles);
        $cont = 0;
        $tmp = Array();
        $whereidpadre = "f.idpadre='$idpadre' AND f.idmodulo='$idmodulo'";

        $query = Doctrine_Query::create();
        $result = $query->select('f.*')
                ->from('Funcionalidades f')
                ->where($whereidpadre)
                ->orderby('indice, nombre')
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        for ($i = 0; $i < count($result); $i++) {
            if ($result[$i]['padre'] != 1) {//si es padre lo almaceno para expandirlo
                $tmp[$cont] = $result[$i];
                $cont++;
            } else {//si es hoja verifico que este asignado al rol
                for ($j = 0; $j < count($functAsig); $j++) {
                    if ($result[$i]['idfuncionalidades'] == $functAsig[$j]['idfuncionalidades']) {//si esta asignado lo adiciono a $tmp
                        $tmp[$cont] = $result[$i];
                        $cont++;
                        break;
                    }
                }
            }
        }
        return $tmp;
    }

    private function recursiva($arrayady) {
        for ($i = 0; $i < count($arrayady); $i++) {
            if ($arrayady[$i]['padre'] != 1) {
                $arrayady[$i]['menu'] = $this->recursiva($this->listaAdyacentes($arrayady[$i]['idfuncionalidades'], $arrayady[$i]['idmodulo']));
                if (!count($arrayady[$i]['menu'])) {
                    unset($arrayady[$i]);
                    $arrayady = array_values($arrayady);
                }
            }
        }
        return $arrayady;
    }

}
