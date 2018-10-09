<?php

class TiposervicioController extends ControllerSecure {

    private $tiposervicio;
    private $tiposervicioModel;

    public function __construct() {
        parent::__construct();
        $this->tiposervicio = new Tiposervicio();
        $this->tiposervicioModel = new TiposervicioModel();
    }

    public function tiposervicioAction() {
        $this->render('tiposervicio');
    }

    public function loaddatatiposervicioAction() {
        echo json_encode($this->tiposervicio->loadDataTiposervicios($this->dataPost));
    }

    public function addtiposervicioAction() {
        echo json_encode($this->tiposervicioModel->addTiposervicio($this->dataRest));
    }

    public function modtiposervicioAction() {
        echo json_encode($this->tiposervicioModel->modTiposervicio($this->dataRest));
    }

    public function deltiposervicioAction() {
        echo json_encode($this->tiposervicioModel->delTiposervicio($this->dataRest));
    }

}