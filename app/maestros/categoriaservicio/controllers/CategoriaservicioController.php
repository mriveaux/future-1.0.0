<?php

class CategoriaservicioController extends ControllerSecure {

    private $categoriaservicio;
    private $categoriaservicioModel;

    public function __construct() {
        parent::__construct();
        $this->categoriaservicio = new Categoriaservicio();
        $this->categoriaservicioModel = new CategoriaservicioModel();
    }

    public function categoriaservicioAction() {
        $this->render('categoriaservicio');
    }

    public function loaddatacategoriaservicioAction() {
        echo json_encode($this->categoriaservicio->loadDataCategoriaservicios($this->dataPost));
    }

    public function addcategoriaservicioAction() {
        echo json_encode($this->categoriaservicioModel->addCategoriaservicio($this->dataRest));
    }

    public function modcategoriaservicioAction() {
        echo json_encode($this->categoriaservicioModel->modCategoriaservicio($this->dataRest));
    }

    public function delcategoriaservicioAction() {
        echo json_encode($this->categoriaservicioModel->delCategoriaservicio($this->dataRest));
    }

}