<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Ldap.php');

class UsuariosModel extends ModelSecure {

    private $docRoot;

    public function __construct() {
        parent::__construct();
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
    }

    public function cambiarContrasenna($usuario, $newpass) {
        try {
            $objUsuarios = new Usuarios();
            $idusuario = $objUsuarios->buscarIdUsuario($usuario);
            $obj = Doctrine_Core::getTable('Usuarios')->find($idusuario);
            $obj->password = $newpass;
            $obj->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function Insertar($argRequest, $idEntidad) {
        try {
            $objUsuarios = new Usuarios();
            $existe = $objUsuarios->buscarUsuarioExistente($argRequest->usuario);
            if (count($existe) > 0) {
                return 1;
            } else {
                $obj = new Usuarios();
                $obj->usuario = $argRequest->usuario;
                $obj->nombre = $argRequest->nombre;
                $obj->apellidos = $argRequest->apellidos;
                $obj->password = md5($this->getDecodePassword($argRequest->contrasenna, $this->dataSession->authToken));
                $obj->idgruporoles = $argRequest->gruporoles;
                $obj->cargo = $argRequest->cargo;
                $obj->estado = $argRequest->estado;
                $obj->email = $argRequest->email; //IMPLEMENTAR LO DE MANDAR EL MAIL
                $obj->rangoip = $argRequest->rangoip;
                $obj->identidad = $idEntidad;
                $obj->tema = $argRequest->tema;
                $obj->idioma = $argRequest->idioma;
                $obj->espaciotrabajo = $argRequest->espaciotrabajo;
                $obj->save();
                if ($argRequest->sendmail == 'true') {
                    $this->sendUserMail($argRequest);
                }
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function Actualizar($argRequest) {
        try {
            $obj = Doctrine_Core::getTable('Usuarios')->find($argRequest->idusuario);
            $obj->nombre = $argRequest->nombre;
            $obj->apellidos = $argRequest->apellidos;
            $obj->cargo = $argRequest->cargo;
            $obj->idgruporoles = $argRequest->gruporoles;
            $obj->estado = $argRequest->estado;
            $obj->email = $argRequest->email;
            $obj->rangoip = $argRequest->rangoip;
            $obj->tema = $argRequest->tema;
            $obj->idioma = $argRequest->idioma;
            $obj->espaciotrabajo = $argRequest->espaciotrabajo;
            $obj->save();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function Eliminar($idusuario) {
        try {
            $obj = Doctrine_Core::getTable('Usuarios')->find($idusuario);
            $obj->delete();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function asignarPerfil($agIdUsuario, $agIdPerfil) {
        try {
            $obj = Doctrine_Core::getTable('Usuarios')->find($agIdUsuario);
            $obj->perfil = $agIdPerfil;
            $obj->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataRoles($argRequest) {
        try {
            $objRoles = new Roles();
            return array('campos' => $objRoles->loadDataRolesPorGrupoService($argRequest->idgruporoles));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function updateAparience($argData) {
        try {
            $obj = Doctrine_Core::getTable('Usuarios')->find($this->dataSession->datiduser);
            $obj->tema = $argData->tema;
            $obj->idioma = $argData->idioma;
            $obj->espaciotrabajo = $argData->workspace;
            $obj->save();
            $objUser = new Usuarios();
            $this->dataSession->alldatauser = $objUser->getAllDataUsuario($this->dataSession->datiduser);
            $this->dataSession->theme = $argData->tema;
            $this->dataSession->lang = $argData->idioma;
            $this->dataSession->espaciotrabajo = $argData->workspace;
            return 1;
        } catch (Exception $exc) {
            echo $exc;
            return 3;
        }
    }

    private function sendUserMail($argUserData) {
        $fileConfigLicense = $this->docRoot . "/comun/comun/xml/license.xml";
        $fileConfigPhpMail = $this->docRoot . "/comun/comun/xml/phpMail.xml";
        $xmlConfigLicense = simplexml_load_file($fileConfigLicense);
        $xmlConfigPhpMail = simplexml_load_file($fileConfigPhpMail);

        $mail = new PHPMailer(true);
        //Server settings
        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = (string) $xmlConfigPhpMail->host; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = (string) $xmlConfigPhpMail->user; // SMTP username
        $mail->Password = $this->getDecodePassword((string) $xmlConfigPhpMail->password, (string) $xmlConfigPhpMail->token); // SMTP password
        $mail->SMTPSecure = 'none'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = (string) $xmlConfigPhpMail->port; // TCP port to connect to
        //Recipients
        $mail->setFrom((string) $xmlConfigPhpMail->fromEmail, (string) $xmlConfigPhpMail->fromName);
        $mail->addAddress($argUserData->email, $argUserData->nombre . ' ' . $argUserData->apellidos); // Add a recipient
        //Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Creacion de nuevo usuario de ' . (string) $xmlConfigLicense->producto;
        $mail->Body = 'Notificaci&oacute;n de creaci&oacute;n de usuario del sistema ' . (string) $xmlConfigLicense->producto . '<br><hr>';
        $mail->Body .='<b>Usuario: </b>' . $argUserData->usuario . '<br>';
        $mail->Body .='<b>Nombre y apellidos: </b>' . $argUserData->nombre . ' ' . $argUserData->apellidos . '<br>';
        $mail->Body .='<b>Contrase&ntilde;a: </b>' . $this->getDecodePassword($argUserData->contrasenna, $this->dataSession->authToken) . '<br>';
        $mail->Body .='<b>Correo electr&oacute;nico: </b>' . $argUserData->email . '<br>';
        $mail->Body .='<b>Rango de IP autorizados: </b>' . $argUserData->ipinicio . '<br><hr>';
        $mail->AltBody = 'Notificaci&oacute;n de creaci&oacute;n de usuario del sistema ' . (string) $xmlConfigLicense->producto . '</br><hr>';
        $mail->AltBody .='<b>Usuario: </b>' . $argUserData->usuario . '</br>';
        $mail->AltBody .='<b>Nombre y apellidos: </b>' . $argUserData->nombre . ' ' . $argUserData->apellidos . '</br>';
        $mail->AltBody .='<b>Contrase&ntilde;a: </b>' . $this->getDecodePassword($argUserData->contrasenna, $this->dataSession->authToken) . '</br>';
        $mail->AltBody .='<b>Correo electr&oacute;nico: </b>' . $argUserData->email . '</br>';
        $mail->AltBody .='<b>Rango de IP autorizados: </b>' . $argUserData->ipinicio . '</br><hr>';
        $mail->send();
        return;
    }

    public function getLdapUsers($argRequest) {
        try {
            $fileConfigLdap = $this->docRoot . "/comun/comun/xml/ldapConfig.xml";
            $xmlConfigLdap = simplexml_load_file($fileConfigLdap);

            $objLdap = new Future_Ldap();
            $conLdap = $objLdap->connect((string) $xmlConfigLdap->host, (int) $xmlConfigLdap->port);
            if ($conLdap) {
                $ldapBind = $objLdap->bind($conLdap, (string) $xmlConfigLdap->dn, (string) $xmlConfigLdap->password);
                if ($ldapBind) {
                    $ldapResults = array();
                    $filter = $objLdap->search($conLdap, (string) $xmlConfigLdap->stdn, 'uid=' . $argRequest->cadena . '*');
                    if ($filter['count'] > 0) {
                        $i = 0;
                        while ($i < $filter['count']) {
                            if (@$filter['data'][$i]['uid'][0] != NULL) {
                                $surnames = explode(" ", @$filter['data'][$i]['sn'][0]);
                                $ldapResults[$i]['username'] = @$filter['data'][$i]['uid'][0];
                                $ldapResults[$i]['firstname'] = @$filter['data'][$i]['givenname'][0];
                                $ldapResults[$i]['lastname'] = @$surnames[0] . ' ' . @$surnames[1];
                                $ldapResults[$i]['secondlastname'] = @$surnames[1];
                                $ldapResults[$i]['ou'] = @$filter['data'][$i]['ou'][0];
                                $ldapResults[$i]['mail'] = @$filter['data'][$i]['mail'][0];
                                $ldapResults[$i]['telephonenumber'] = @$filter['data'][$i]['telephonenumber'][0];
                                $ldapResults[$i]['department'] = @$filter['data'][$i]['departament'][0];
                                $ldapResults[$i]['job'] = @$filter['data'][$i]['title'][0];
                            }
                            $i++;
                        }
                    }
                    return array('campos' => $ldapResults);
                } else {
                    /* lanzo una excepcion o dejo un mensaje de notificacion en bandeja
                      al usuario que no se pudo conectar con el ldap */
                    throw new Future_Exception('LDAP0002');
                }
            } else {
                throw new Future_Exception('LDAP0002');
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveConfigAccesoEntidades($argRequest) {
        try {
            $identidadescheck = json_decode(stripslashes($argRequest->identidadescheck));
            $identidadesuncheck = json_decode(stripslashes($argRequest->identidadesuncheck));
            $objUserRolEnt = new UsuarioRolEnt();
            if ($identidadesuncheck != null && count($identidadesuncheck) > 0) {
                foreach ($identidadesuncheck as $v) {
                    $idUsuarioRolEnt = $objUserRolEnt->buscarEntidadesRolUsuario($argRequest->idusuario, $argRequest->idroles, $v);
                    if (count($idUsuarioRolEnt) > 0) {
                        $obj = Doctrine_Core::getTable('UsuarioRolEnt')->find($idUsuarioRolEnt[0]['idusuariorolentidad']);
                        $obj->delete();
                    }
                }
            }
            if ($identidadescheck != null && count($identidadescheck) > 0) {
                foreach ($identidadescheck as $v) {
                    $idUsuarioRolEnt = $objUserRolEnt->buscarEntidadesRolUsuario($argRequest->idusuario, $argRequest->idroles, $v);
                    if (count($idUsuarioRolEnt) == 0) {
                        $objUserRolEnti = new UsuarioRolEnt();
                        $objUserRolEnti->identidad = $v;
                        $objUserRolEnti->idusuario = $argRequest->idusuario;
                        $objUserRolEnti->idroles = $argRequest->idroles;
                        $objUserRolEnti->save();
                    }
                }
            }
            return true;
        } catch (Exception $exc) {
            throw $exc;
            return false;
        }
    }

}
