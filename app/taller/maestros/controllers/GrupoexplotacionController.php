<?php

class GrupoexplotacionController extends ControllerSecure {

    private $grupoexplotacion;
    private $grupoexplotacionModel;

    public function __construct() {
        parent::__construct();
        $this->grupoexplotacion = new Grupoexplotacion();
        $this->grupoexplotacionModel = new GrupoexplotacionModel();
    }

    public function grupoexplotacionAction() {
        $this->render('grupoexplotacion');
    }

    public function getgrupoexplotacionAction() {
        echo json_encode($this->grupoexplotacion->getGrupoexplotacion($this->dataPost));
    }

    public function addgrupoexplotacionAction() {
        echo json_encode($this->grupoexplotacionModel->addGrupoexplotacion($this->dataPost));
    }

    public function modgrupoexplotacionAction() {
        echo json_encode($this->grupoexplotacionModel->modGrupoexplotacion($this->dataPost));
    }

    public function delgrupoexplotacionAction() {
        echo json_encode($this->grupoexplotacionModel->delGrupoexplotacion($this->dataPost->idgrupoexplotacion));
    }

}