<?php

class GrupoescalaController extends ControllerSecure {

    public $Grupoescala;
    public $GrupoescalaModel;

    public function __construct() {
        parent::__construct();
        $this->Grupoescala = new Grupoescala();
        $this->GrupoescalaModel = new GrupoescalaModel();
    }

    public function grupoescalaAction() {
        $this->render('grupoescala');
    }

    public function getgrupoescalaAction() {
        echo json_encode($this->Grupoescala->getGrupoescala($this->dataPost));
    }

    public function adicionargrupoescalaAction() {
        echo json_encode($this->GrupoescalaModel->Adicionar($this->dataPost));
    }

    public function modificargrupoescalaAction() {
        echo json_encode($this->GrupoescalaModel->Modificar($this->dataPost));
    }

    public function deletegrupoescalaAction() {
        echo json_encode($this->GrupoescalaModel->eliminarGrupoescala($this->dataPost->idgrupoescala));
    }

}
