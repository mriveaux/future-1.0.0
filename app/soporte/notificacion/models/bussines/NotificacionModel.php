<?php

class NotificacionModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addNotificacion($data) {
        try {
            $notificacion = new Notificacion();
            $notificacion->idnotificacion = $data->idnotificacion;
            $notificacion->notificacion = $data->notificacion;
            $notificacion->idusuario = $data->idusuario;
            $notificacion->prioridad = $data->prioridad;
            $notificacion->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modNotificacion($data) {
        try {
            $notificacion = Doctrine_Core::getTable('Notificacion')->find($data->idnotificacion);
            $notificacion->notificacion = $data->notificacion;
            $notificacion->idusuario = $data->idusuario;
            $notificacion->fecha = $data->fecha;
            $notificacion->tiempo = $data->tiempo;
            $notificacion->estado = $data->estado;
            $notificacion->prioridad = $data->prioridad;
            $notificacion->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delNotificacion($id) {
        try {
            $notificacion = Doctrine_Core::getTable('Notificacion')->find($id);
            $notificacion->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
