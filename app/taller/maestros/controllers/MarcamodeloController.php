<?php

class MarcamodeloController extends ControllerSecure {

    private $marcamodelo;
    private $marcamodeloModel;

    public function __construct() {
        parent::__construct();
        $this->marcamodelo = new Marcamodelo();
        $this->marcamodeloModel = new MarcamodeloModel();
    }

    public function marcamodeloAction() {
        $this->render('marcamodelo');
    }

    public function getmarcamodeloAction() {
        echo json_encode($this->marcamodelo->getMarcamodelo($this->dataPost));
    }

    public function gettipovehiculoAction() {
        echo json_encode($this->marcamodeloModel->getTipovehiculo($this->dataPost));
    }

    public function addmarcamodeloAction() {
        echo json_encode($this->marcamodeloModel->addMarcamodelo($this->dataPost));
    }

    public function modmarcamodeloAction() {
        echo json_encode($this->marcamodeloModel->modMarcamodelo($this->dataPost));
    }

    public function delmarcamodeloAction() {
        echo json_encode($this->marcamodeloModel->delMarcamodelo($this->dataPost->idmarcamodelo));
    }

}