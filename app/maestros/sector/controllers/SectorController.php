<?php

class SectorController extends ControllerSecure {

    private $sector;
    private $sectorModel;

    public function __construct() {
        parent::__construct();
        $this->sector = new Sector();
        $this->sectorModel = new SectorModel();
    }

    public function sectorAction() {
        $this->render('sector');
    }

    public function loaddatasectorAction() {
        echo json_encode($this->sector->loadDataSectores($this->dataPost));
    }

    public function addsectorAction() {
        echo json_encode($this->sectorModel->addSector($this->dataRest));
    }

    public function modsectorAction() {
        echo json_encode($this->sectorModel->modSector($this->dataRest));
    }

    public function delsectorAction() {
        echo json_encode($this->sectorModel->delSector($this->dataRest));
    }

}