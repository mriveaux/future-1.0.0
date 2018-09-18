<?php

class OperacionesController extends ControllerSecure {

    private $operaciones;
    private $operacionesModel;

    public function __construct() {
        parent::__construct();
        $this->operaciones = new Operaciones();
        $this->operacionesModel = new OperacionesModel();
    }

    public function operacionesAction() {
        $this->render('operaciones');
    }

    public function getoperacionesAction() {
        echo json_encode($this->operaciones->getOperaciones($this->dataPost));
    }

    public function getactividadesAction() {
        echo json_encode($this->operacionesModel->listActividades());
    }

    public function addoperacionAction() {
        echo json_encode($this->operacionesModel->addOperaciones($this->dataPost));
    }

    public function modoperacionAction() {
        echo json_encode($this->operacionesModel->modOperaciones($this->dataPost));
    }

    public function deloperacionAction() {
        echo json_encode($this->operacionesModel->delOperaciones($this->dataPost->idoperacion));
    }

    public function activateoperacionAction() {
        echo json_encode($this->operacionesModel->activarDesactivar($this->dataPost));
    }

    public function loadDataPreviewAction() {
        echo json_encode($this->operacionesModel->loadDataPreview());
    }

}