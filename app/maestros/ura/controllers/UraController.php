<?php

class UraController extends ControllerSecure {

    private $ura;
    private $uraModel;

    public function __construct() {
        parent::__construct();
        $this->ura = new Ura();
        $this->uraModel = new UraModel();
        $this->_integrator->setModels('estructuraorg', 'Entidades');
    }

    public function uraAction() {
        $this->render('ura');
    }

    public function loaddataurasAction() {
        echo json_encode($this->ura->loadDataUras($this->dataPost));
    }

    public function loaddatacentroatencionAction() {
        echo json_encode($this->uraModel->loadDataCentrosAtencionSubordinados());
    }

    public function adduraAction() {
        echo json_encode($this->uraModel->addUra($this->dataRest));
    }

    public function moduraAction() {
        echo json_encode($this->uraModel->modUra($this->dataRest));
    }

    public function deluraAction() {
        echo json_encode($this->uraModel->delUra($this->dataRest));
    }

}