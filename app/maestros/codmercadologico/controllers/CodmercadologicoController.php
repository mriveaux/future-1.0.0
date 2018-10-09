<?php

class CodmercadologicoController extends ControllerSecure {

    private $codmercadologico;
    private $codmercadologicoModel;
    private $categoriaservicio;

    public function __construct() {
        parent::__construct();
        $this->codmercadologico = new Codmercadologico();
        $this->codmercadologicoModel = new CodmercadologicoModel();
        $this->_integrator->setModels('maestros', 'NomCategoriaservicio');
        $this->categoriaservicio = new Categoriaservicio();
    }

    public function codmercadologicoAction() {
        $this->render('codmercadologico');
    }

    public function loaddatacodmercadologicoAction() {
        echo json_encode($this->codmercadologico->loadDataCodmercadologico($this->dataRest));
    }

    public function loaddatacategoriaservicioAction() {
        echo json_encode($this->categoriaservicio->loadDataCategoriaserviciosService($this->dataPost));
    }

    public function addcodmercadologicoAction() {
        echo json_encode($this->codmercadologicoModel->addCodmercadologico($this->dataRest));
    }

    public function modcodmercadologicoAction() {
        echo json_encode($this->codmercadologicoModel->modCodmercadologico($this->dataRest));
    }

    public function delcodmercadologicoAction() {
        echo json_encode($this->codmercadologicoModel->delCodmercadologico($this->dataRest));
    }

}