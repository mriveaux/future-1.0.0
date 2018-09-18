<?php

class TipovehiculoController extends ControllerSecure {

    private $tipovehiculo;
    private $tipovehiculoModel;

    public function __construct() {
        parent::__construct();
        $this->tipovehiculo = new Tipovehiculo();
        $this->tipovehiculoModel = new TipovehiculoModel();
    }

    public function tipovehiculoAction() {
        $this->render('tipovehiculo');
    }

    public function gettipovehiculoAction() {
        echo json_encode($this->tipovehiculo->getTipovehiculos($this->dataPost));
    }

    public function addtipovehiculoAction() {
        echo json_encode($this->tipovehiculoModel->addTipovehiculo($this->dataPost));
    }

    public function modtipovehiculoAction() {
        echo json_encode($this->tipovehiculoModel->modTipovehiculo($this->dataPost));
    }

    public function deltipovehiculoAction() {
        echo json_encode($this->tipovehiculoModel->delTipovehiculo($this->dataPost->idtipovehiculo));
    }

}