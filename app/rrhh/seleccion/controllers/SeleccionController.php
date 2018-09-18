<?php

class SeleccionController extends ControllerSecure {

    private $seleccion;
    private $seleccionModel;

    public function __construct() {
        parent::__construct();
        $this->seleccion = new Seleccion();
        $this->seleccionModel = new SeleccionModel();
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->_integrator->setModels('estructuraorg', 'Maestros');
        $this->_integrator->setModels('estructuraorg', 'Plantilla');
    }

    public function seleccionAction() {
        $this->render('seleccion');
    }

    public function getseleccionAction() {
        echo json_encode($this->seleccion->getSelecciones());
    }

    public function getprocesosAction() {
        echo json_encode($this->seleccionModel->getProcesos());
    }

    public function addseleccionAction() {
        echo json_encode($this->seleccionModel->addSeleccion($this->dataPost));
    }

    public function modseleccionAction() {
        echo json_encode($this->seleccionModel->modSeleccion($this->dataPost));
    }

    public function delseleccionAction() {
        echo json_encode($this->seleccionModel->delSeleccion($this->dataPost));
    }

}