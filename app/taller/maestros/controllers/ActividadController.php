<?php

class ActividadController extends ControllerSecure {

    private $actividad;
    private $actividadModel;

    public function __construct() {
        parent::__construct();
        $this->actividad = new Actividad();
        $this->actividadModel = new ActividadModel();
    }

    public function actividadAction() {
        $this->render('actividad');
    }

    public function getactividadAction() {
        echo json_encode($this->actividad->getActividades($this->dataPost));
    }

    public function addactividadAction() {
        echo json_encode($this->actividadModel->addActividad($this->dataPost));
    }

    public function modactividadAction() {
        echo json_encode($this->actividadModel->modActividad($this->dataPost));
    }

    public function delactividadAction() {
        echo json_encode($this->actividadModel->delActividad($this->dataPost->idactividad));
    }

}