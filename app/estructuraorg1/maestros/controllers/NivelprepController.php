<?php

class NivelprepController extends ControllerSecure {

    public $Nivelprep;
    public $NivelprepModel;

    public function __construct() {
        parent::__construct();
        $this->Nivelprep = new Nivelprep();
        $this->NivelprepModel = new NivelprepModel();
    }

    public function nivelprepAction() {
        $this->render('nivelprep');
    }

    public function getnivelprepAction() {
        echo json_encode($this->Nivelprep->getNivelprep($this->dataPost));
    }

    public function adicionarnivelprepAction() {
        echo json_encode($this->NivelprepModel->Adicionar($this->dataPost));
    }

    public function modificarnivelprepAction() {
        echo json_encode($this->NivelprepModel->Modificar($this->dataPost));
    }

    public function deletenivelprepAction() {
        echo json_encode($this->NivelprepModel->eliminarNivelprep($this->dataPost->idnivelprep));
    }

}
