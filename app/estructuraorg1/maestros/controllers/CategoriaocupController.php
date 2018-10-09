<?php

class CategoriaocupController extends ControllerSecure {

    public $Categoriaocup;
    public $CategoriaocupModel;

    public function __construct() {
        parent::__construct();
        $this->Categoriaocup = new Categoriaocup();
        $this->CategoriaocupModel = new CategoriaocupModel();
    }

    public function categoriaocupAction() {
        $this->render('categoriaocup');
    }

    public function getcategoriaocupAction() {
        echo json_encode($this->Categoriaocup->getCategoriaocup($this->dataPost));
    }

    public function adicionarcategoriaocupAction() {
        echo json_encode($this->CategoriaocupModel->Adicionar($this->dataPost));
    }

    public function modificarcategoriaocupAction() {
        echo json_encode($this->CategoriaocupModel->Modificar($this->dataPost));
    }

    public function deletecategoriaocupAction() {
        echo json_encode($this->CategoriaocupModel->eliminarCategoriaocup($this->dataPost->idcategoriaocup));
    }

}
