<?php

class NotificacionController extends ControllerSecure {

    private $notificacion;
    private $notificacionModel;

    public function __construct() {
        parent::__construct();
        $this->notificacion = new Notificacion();
        $this->notificacionModel = new NotificacionModel();
    }

    public function notificacionAction() {
        $this->render('notificacion');
    }

    public function addnotificacionAction() {
        echo json_encode($this->notificacionModel->addNotificacion($this->dataPost));
    }

    public function modnotificacionAction() {
        echo json_encode($this->notificacionModel->modNotificacion($this->dataPost));
    }

    public function delnotificacionAction() {
        echo json_encode($this->notificacionModel->delNotificacion($this->dataPost));
    }

    public function getnotificacionAction() {
        echo json_encode($this->notificacion->getNotificaciones());
    }

}
