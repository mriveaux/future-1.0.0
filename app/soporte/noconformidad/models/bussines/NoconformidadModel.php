<?php

class NoconformidadModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addNoConformidad($data) {
        try {
            $noconformidad = new Noconformidad();
            $noconformidad->ruta = $data->ruta;
            $noconformidad->noconformidad = $data->noconformidad;
            $noconformidad->idusuario = isset($data->idusuario) ? $data->idusuario : $this->dataSession->datiduser;
            if (isset($data->base64img)) {
                $noconformidad->imagen = $data->base64img;
            }
            $noconformidad->save();
            //si se pudo guardar, y esta activo el envio de correo 
            //como parte de otro servicio al soporte system.xml
//            $this->sendMailtoSupport($data);
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function modNoConformidad($data) {
        try {
            $noconformidad = Doctrine_Core::getTable('Noconformidad')->find($data->idrecomendacion);
            $noconformidad->ruta = $data->ruta;
            $noconformidad->noconformidad = $data->noconformidad;
            $noconformidad->idusuario = $data->idusuario;
            if (isset($data->base64img)) {
                $noconformidad->imagen = $data->base64img;
            }
            $noconformidad->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delNoConformidad($id) {
        try {
            $noconformidad = Doctrine_Core::getTable('Noconformidad')->find($id);
            $noconformidad->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function sendMailtoSupport($data) {
        try {
            $to = 'cubasoft@gmail.com';
            $subject = 'No conformidad detectada en la plataforma web';
            $message = $data->ruta . "\r\n";
            $message .= $data->noconformidad;
            $serverAdmin = $data->getServer('SERVER_ADMIN');
            $headers = "To: Cubasoft <cubasoft@gmail.com>" . "\r\n";
            $headers .= "From: $data->usuario <$serverAdmin>" . "\r\n";
            $headers .= "Reply-To: $serverAdmin" . "\r\n" . 'X-Mailer: PHP/' . phpversion();
            mail($to, $subject, $message, $headers);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
