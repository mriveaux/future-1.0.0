<?php

class EngineModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
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
        return array('tema' => $dataUser->tema, 'idioma' => $dataUser->idioma, 'workspace' => $dataUser->espaciotrabajo);
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

}
