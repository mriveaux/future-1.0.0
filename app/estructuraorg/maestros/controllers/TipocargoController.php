<?php

class TipocargoController extends ControllerSecure {

    public $Tipocargo;
    public $TipocargoModel;

    public function __construct() {
        parent::__construct();
        $this->Tipocargo = new Tipocargo();
        $this->TipocargoModel = new TipocargoModel();
    }

    public function tipocargoAction() {
        $this->render('tipocargo');
    }

    public function gettipocargoAction() {
        echo json_encode($this->Tipocargo->getTipocargo($this->dataPost));
    }

    public function adicionartipocargoAction() {
        echo json_encode($this->TipocargoModel->Adicionar($this->dataPost));
    }

    public function modificartipocargoAction() {
        echo json_encode($this->TipocargoModel->Modificar($this->dataPost));
    }

    public function deletetipocargoAction() {
        echo json_encode($this->TipocargoModel->eliminarTipocargo($this->dataPost->idtipocargo));
    }

}
