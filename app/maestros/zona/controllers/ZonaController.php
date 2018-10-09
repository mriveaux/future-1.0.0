<?php

class ZonaController extends ControllerSecure {

    private $zona;
    private $zonaModel;

    public function __construct() {
        parent::__construct();
        $this->zona = new Zona();
        $this->zonaModel = new ZonaModel();
        $this->_integrator->setModels('estructuraorg', 'Entidades');
    }

    public function zonaAction() {
        $this->render('zona');
    }

    public function loaddatazonasAction() {
        echo json_encode($this->zona->loadDataZonas($this->dataPost));
    }

    public function loaddatacentroatencionAction() {
        echo json_encode($this->zonaModel->loadDataCentrosAtencionSubordinados());
    }

    public function addzonaAction() {
        echo json_encode($this->zonaModel->addZona($this->dataRest));
    }

    public function modzonaAction() {
        echo json_encode($this->zonaModel->modZona($this->dataRest));
    }

    public function delzonaAction() {
        echo json_encode($this->zonaModel->delZona($this->dataRest));
    }

}
