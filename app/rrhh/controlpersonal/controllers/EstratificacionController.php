<?php

class EstratificacionController extends ControllerSecure {

    private $estratificacion;
    private $estratificacionModel;

    public function __construct() {
        parent::__construct();
        $this->estratificacion = new Estratificacion();
        $this->estratificacionModel = new EstratificacionModel();
    }

    public function getestratificacionesAction() {
        echo $this->dataResponse->toJson($this->estratificacion->getEstratificaciones($this->dataPost));
    }

    public function addestratificacionAction() {
        echo $this->dataResponse->toJson($this->estratificacionModel->addEstratificacion($this->dataRest));
    }

    public function modestratificacionAction() {
        echo $this->dataResponse->toJson($this->estratificacionModel->modEstratificacion($this->dataRest));
    }

    public function delestratificacionAction() {
        echo $this->dataResponse->toJson($this->estratificacionModel->delEstratificacion($this->dataRest));
    }

}
