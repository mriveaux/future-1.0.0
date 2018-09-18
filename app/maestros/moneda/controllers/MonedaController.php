<?php

class MonedaController extends ControllerSecure {

    private $moneda;
    private $monedaModel;

    public function __construct() {
        parent::__construct();
        $this->moneda = new Moneda();
        $this->monedaModel = new MonedaModel();
        $this->_integrator->setModels('maestros', 'NomPais');
    }

    public function monedaAction() {
        $this->render('moneda');
    }

    public function getmonedasAction() {
        echo $this->dataResponse->toJson($this->moneda->getMonedas($this->dataPost));
    }

    public function addmonedaAction() {
        echo $this->dataResponse->toJson($this->monedaModel->addMoneda($this->dataRest));
    }

    public function modmonedaAction() {
        echo $this->dataResponse->toJson($this->monedaModel->modMoneda($this->dataRest));
    }

    public function delmonedaAction() {
        echo $this->dataResponse->toJson($this->monedaModel->delMoneda($this->dataRest));
    }
    
    public function getpaisesAction() {
        $objPais = new Pais();
        $result = $objPais->getListPaisesService();
        echo json_encode(['data' => $result]);
    }

}
