<?php

class RecomendacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addRecomendation($data) {
        try {
            $recomendacion = new Recomendacion();
            $recomendacion->recomendacion = $data->recomendacion;
            $recomendacion->idusuario = $data->idusuario;
            $recomendacion->save();
            //si se pudo guardar, entonces enviar por correo 
            //como parte de otro servicio
//            $this->sendMailtoSupport($data);
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modRecomendation($data) {
        try {
            $recomendacion = Doctrine_Core::getTable('Recomendacion')->find($data->idrecomendacion);
            $recomendacion->recomendacion = $data->recomendacion;
            $recomendacion->idusuario = $data->idusuario;
            $recomendacion->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delRecomendation($id) {
        try {
            $recomendacion = Doctrine_Core::getTable('Recomendacion')->find($id);
            $recomendacion->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function sendMailtoSupport($data) {
        try {
            $to = 'mdriveaux2015@gmail.com';
            $subject = 'Sugerencia a la plataforma web';
            $message = $data->recomendacion;
            $serverAdmin = $data->getServer('SERVER_ADMIN');
            $headers = "To: GESI <mdriveaux2015@gmail.com>" . "\r\n";
            $headers .= "From: $data->usuario <$serverAdmin>" . "\r\n";
            $headers .= "Reply-To: $serverAdmin" . "\r\n" . 'X-Mailer: PHP/' . phpversion();
            mail($to, $subject, $message, $headers);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
