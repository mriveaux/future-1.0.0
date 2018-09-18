<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Ldap.php');

class IndexModel extends ModelSecure {

    private $docRoot;
    private $usuarios;
    private $usuarioRolEnt;
    private $countLockUser;
    private $countBlockIp;
    private $usuariosModel;

    public function __construct() {
        parent::__construct();
        $this->countLockUser = 0;
        $this->countBlockIp = 0;
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
        $this->usuarios = new Usuarios();
        $this->usuariosModel = new UsuariosModel();
        $this->usuarioRolEnt = new UsuarioRolEnt();
    }

    /**
     * Check data user for allowing access to system.
     * 0 User or pass are not valid.
     * 1 Inactive User.
     * 2 Restricted IP.
     * 3 Access granted
     * 4 LDAP not available.
     * 5 Blocked user
     * 6 Block IP adress.
     * @return int C&oacute;digo que identifica el resultado.
     */
    public function futureAuthUser($argPost, $authToken) {
        try {
            extract($this->Base64DecodeSecret($argPost, $authToken));
            if (!isset($_SESSION['datuser']) && (array_key_exists($plain_user, $_SESSION) == false) && $this->dataSession->logged != 'on') {
                if (strlen($id_session_user) >= 30 || preg_match("/\+\*\/\@/", $id_session_user)) {
                    return 9;
                }
                $this->dataSession->destroy();
                ini_set('session.use_strict_mode', 0);
                ini_set('session.use_strict_mode', 1);
                session_id($id_session_user);
                $this->dataSession = Future_Session::getInstance($authToken);

                $this->dataSession->datuser = $plain_user;
                $this->dataSession->logged = 'off';
                $fileConfigSystem = $this->docRoot . "/comun/comun/xml/system.xml";
                $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
                $typeAccess = (string) $xmlConfigSystem->access->type;
                $argPost->usuario = $plain_user;
                $argPost->password = md5($plain_pass);
                if ($typeAccess == 'mixed' || $typeAccess == 'ldap') {
                    $fileConfigLdap = $this->docRoot . "/comun/comun/xml/ldapConfig.xml";
                    $xmlConfigLdap = simplexml_load_file($fileConfigLdap);
                    $objLdap = new Future_Ldap();
                    $conLdap = $objLdap->connect((string) $xmlConfigLdap->host, (int) $xmlConfigLdap->port);
                    if ($conLdap) {
                        $uid = 'uid=' . $plain_user . ',';
                        $ldapBind = $objLdap->bind($conLdap, $uid . (string) $xmlConfigLdap->stdn, $plain_pass);
                        if ($ldapBind) {
                            return $this->verifyDataUser($argPost, true);
                        } else if ($typeAccess == 'mixed') {//si falla el ldap se realiza la autenticacion por el simple
                            return $this->verifyDataUser($argPost);
                        } else {
                            /* lanzo una excepcion o dejo un mensaje de notificacion en bandeja
                              al usuario que no se pudo conectar con el ldap */
                            throw new Future_Exception('LDAP0002');
                            return 0;
                        }
                    } else if ($typeAccess == 'mixed') {//si falla el ldap se realiza la autenticacion por el simple
                        return $this->verifyDataUser($argPost);
                    } else {
                        throw new Future_Exception('LDAP0002');
                        return 4;
                    }
                } else {
                    return $this->verifyDataUser($argPost);
                }
            } else {
                if (isset($argPost->change)) {
                    return 3;
                } else {
                    $hashMd5 = md5($plain_user . $argPost->getIPClient());
                    if (array_search($hashMd5, $_SESSION) != false) {
                        return 8;
                    } else {
                        return 7;
                    }
                }
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function goBack() {
        try {
            $this->dataSession->destroy();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadEntities() {
        try {
            $this->setDataSession();
            $resultLoggin = $this->usuarioRolEnt->loadLoginEntity();
            return $resultLoggin;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function setEntityData($argRequest) {
        $this->dataSession->identidad = $argRequest->identidad;
        $this->dataSession->identidad_padre = $argRequest->identidad_padre;
        $this->dataSession->desc_entidad = $argRequest->desc_entidad;
        $this->dataSession->arridroles = $this->usuarioRolEnt->getIdRolesByIdUserEntidad($this->dataSession->datiduser, $argRequest->identidad); //se trabaja con el idgruporoles
        return true;
    }

    private function verifyDataUser($post, $useLdap = false) {
        try {
            $fileConfigSystem = $this->docRoot . "/comun/comun/xml/system.xml";
            $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
            $maxCountLockUser = (int) $xmlConfigSystem->blockadeuser->number;
            $maxCountBlockIp = (int) $xmlConfigSystem->blockadeip->number;
            $dataUser = $this->usuarios->cargardatosuser($this->dataSession->datuser);
            if ($dataUser[0]['estado'] != 2) {
                while ($this->dataSession->getCookie('countLockUser') < $maxCountLockUser && $this->dataSession->getCookie('countBlockIp') < $maxCountBlockIp) {
                    //To do
                    //verificar que no esta bloquedo en bd el usuario o el ip
                    $checkDataUser = $this->usuarios->verificardatosuser($this->dataSession->datuser, $post->password, $useLdap);
                    if (!$checkDataUser) {
                        $countLockUser = $this->dataSession->getCookie('countLockUser') + 1;
                        setcookie('countLockUser', $countLockUser);
                        unset($this->dataSession->datuser);
                        return 0;
                    } else {
                        $checkStatusUser = $this->usuarios->verificarUsuarioActivo($this->dataSession->datuser);
                        if (!$checkStatusUser == 1) {
                            unset($this->dataSession->datuser);
                            return 1;
                        } else {
                            $checkIpUser = $this->usuarios->verificarIP($this->dataSession->datuser, $post);
                            if (!$checkIpUser) {
                                $countBlockIp = $this->dataSession->getCookie('countBlockIp') + 1;
                                setcookie('countBlockIp', $countBlockIp);
                                unset($this->dataSession->datuser);
                                return 2;
                            } else {
                                $this->dataSession->logged = "on";
                                setcookie('countLockUser', 0);
                                setcookie('countBlockIp', 0);
                                $this->dataSession->hash = md5($post->usuario . $post->getIPClient());
                                return 3;
                            }
                        }
                    }
                }
                if ($this->dataSession->getCookie('countLockUser') >= $maxCountLockUser) {
                    $this->blockUser($post->getIPClient());
                    return 5;
                }
                if ($this->dataSession->getCookie('countBlockIp') >= $maxCountBlockIp) {
                    $this->blockIpClient($post->getIPClient());
                    return 6;
                }
            } else {
                $objBloque = new Bloqueo();
                $bloqueo = $objBloque->getBloqueoUsuario($dataUser[0]['idusuario']);
                return ($bloqueo[0]['tipobloqueo'] == 1) ? 5 : 6;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function setDataSession() {
        try {
            $this->dataSession->logged = 'on';
            $this->dataSession->datiduser = $this->usuarios->dameIdUsuario($this->dataSession->datuser);
            $data_name = $this->usuarios->getAllDataUsuario($this->dataSession->datiduser);
            $this->dataSession->alldatauser = $data_name;
            $this->dataSession->theme = $data_name->tema;
            $this->dataSession->lang = $data_name->idioma;
            $this->dataSession->espaciotrabajo = $data_name->espaciotrabajo;
            $this->dataSession->datnombreuser = $data_name->nombre . ' ' . $data_name->apellidos;
            $this->dataSession->datfullname = $data_name->nombre . ' ' . $data_name->apellidos;
            $this->dataSession->datname = $data_name->nombre;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function blockUser($argIpClient) {
        $fileConfigSystem = $this->docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        $typeBlock = (int) $xmlConfigSystem->blockadeuser->type;
        if ($typeBlock == 2) {
            $countLockUser = $this->dataSession->getCookie('countLockUser');
            $timeBockUser = (int) $xmlConfigSystem->blockadeuser->cachetime;
            setcookie('countLockUser', $countLockUser, $timeBockUser);
        } else { //bloquear en bd
            $this->bloquearUsuario(1, $argIpClient);
        }
    }

    private function blockIpClient($argIpClient) {
        $fileConfigSystem = $this->docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        $typeBlock = (int) $xmlConfigSystem->blockadeip->type;
        if ($typeBlock == 2) {
            $countLockUser = $this->dataSession->getCookie('countLockUser');
            $timeBockUser = (int) $xmlConfigSystem->blockadeip->cachetime;
            setcookie('countBlockIp', $countLockUser, $timeBockUser);
        } else { //bloquear en bd
            $this->bloquearUsuario(2, $argIpClient);
        }
    }

    private function bloquearUsuario($argType, $argIP) {
        $data = new stdClass();
        $data->idusuario = $this->usuarios->dameIdUsuario($this->dataSession->datuser);
        $data->tipobloqueo = $argType;
        $data->ipbloqueo = $argIP;
        $block = new BloqueoModel();
        $block->bloquearUsuario($data);
    }

    private function Base64DecodeSecret($argPost, $authToken) {
        try {
            $decoded_pass = $this->decodeStringToken($argPost->n);
            $arr_plain_pass = explode($authToken, $decoded_pass);
            $plain_pass = $arr_plain_pass[0];
            $md5_pass = md5($plain_pass);
            $decoded_user = $this->decodeStringToken($argPost->t);
            $arr_plain_user = explode($authToken, $decoded_user);
            $plain_user = $arr_plain_user[0];
            $id_session_user = (strpos($plain_user, '.') !== false) ? str_replace('.', '-', $plain_user) : $plain_user;
            return array('plain_pass' => $plain_pass, 'md5_pass' => $md5_pass, 'plain_user' => $plain_user, 'id_session_user' => $id_session_user);
        } catch (Exception $exc) {
            throw $exc->getTraceAsString();
        }
    }

}
