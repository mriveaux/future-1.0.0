<?php

class UnidadmedidaController extends ControllerSecure {

    private $unidadmedida;
    private $unidadmedidaModel;

    public function __construct() {
        parent::__construct();
        $this->unidadmedida = new Unidadmedida();
        $this->unidadmedidaModel = new UnidadmedidaModel();
        $this->_integrator->setModels('maestros', 'NomProducto');
    }

    public function unidadmedidaAction() {
        $this->render('unidadmedida');
    }

    public function loadunidadmedidaAction() {
        echo json_encode($this->unidadmedida->loadDataUnidadmedida($this->dataPost));
    }

    public function addunidadmedidaAction() {
        echo json_encode($this->unidadmedidaModel->addUnidadMedida($this->dataPost));
    }

    public function modunidadmedidaAction() {
        echo json_encode($this->unidadmedidaModel->modUnidadMedida($this->dataPost));
    }

    public function delunidadmedidaAction() {
        echo json_encode($this->unidadmedidaModel->delUnidadMedida($this->dataPost));
    }

}
