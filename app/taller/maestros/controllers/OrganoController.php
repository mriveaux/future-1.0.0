<?php

class OrganoController extends ControllerSecure {

    public $organo;
    public $organoModel;

    public function __construct() {
        parent::__construct();
        $this->organo = new Organo();
        $this->organoModel = new OrganoModel();
    }

    public function organoAction() {
        $this->render('organo');
    }

    public function cargarorganoAction() {
        echo json_encode($this->organo->cargarorgano($this->dataPost->start, $this->dataPost->limit, $this->dataPost->cadena));
    }

    public function adicionarorganoAction() {
        echo json_encode($this->organoModel->Adicionar($this->dataPost));
    }

    public function modificarorganoAction() {
        echo json_encode($this->organoModel->Modificar($this->dataPost));
    }

    public function eliminarorganoAction() {
        echo json_encode($this->organoModel->Eliminar($this->dataPost));
    }

}