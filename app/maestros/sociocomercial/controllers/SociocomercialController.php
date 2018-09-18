<?php

class SociocomercialController extends ControllerSecure {

    private $sociocomercial;
    private $sociocomercialModel;

    public function __construct() {
        parent::__construct();
        $this->sociocomercial = new Sociocomercial();
        $this->sociocomercialModel = new SociocomercialModel();
        $this->_integrator->setModels('maestros', 'NomPais');
        $this->_integrator->setModels('maestros', 'NomTipodpa');
    }

    public function sociocomercialAction() {
        $this->render('sociocomercial');
    }

    public function getsociocomercialAction() {
        echo json_encode($this->sociocomercialModel->getSociocomerciales($this->dataPost));
    }

    public function savesociocomercialAction() {
        echo json_encode($this->sociocomercialModel->saveSocioComercial($this->dataPost));
    }

    public function modsociocomercialAction() {
        echo json_encode($this->sociocomercialModel->modSocioComercial($this->dataPost));
    }

    public function delsociocomercialAction() {
        echo json_encode($this->sociocomercialModel->delSocioComercial($this->dataPost));
    }

    public function getdatarptAction() {
        echo json_encode($this->sociocomercialModel->getDataRpt());
    }
    
    public function getpaisesAction() {
        $objPais = new Pais();
        $result = $objPais->getListPaisesService($this->dataPost);
        echo json_encode(['data' => $result]);
    }

}
