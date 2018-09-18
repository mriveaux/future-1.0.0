<?php

class TipoescalaController extends ControllerSecure {

    public $Tipoescala;
    public $TipoescalaModel;

    public function __construct() {
        parent::__construct();
        $this->Tipoescala = new Tipoescala();
        $this->TipoescalaModel = new TipoescalaModel();
    }

    public function tipoescalaAction() {
        $this->render('tipoescala');
    }

    public function gettipoescalaAction() {
        echo json_encode($this->Tipoescala->getTipoescala($this->dataPost));
    }

    public function adicionartipoescalaAction() {
        echo json_encode($this->TipoescalaModel->Adicionar($this->dataPost));
    }

    public function modificartipoescalaAction() {
        echo json_encode($this->TipoescalaModel->Modificar($this->dataPost));
    }

    public function deletetipoescalaAction() {
        echo json_encode($this->TipoescalaModel->eliminarTipoescala($this->dataPost->idtipoescala));
    }

}
