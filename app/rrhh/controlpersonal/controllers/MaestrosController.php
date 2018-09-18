<?php

class MaestrosController extends ControllerSecure {

    private $maestros;
    private $maestrosModel;

    public function __construct() {
        parent::__construct();
        $this->maestros = new Maestros();
        $this->maestrosModel = new MaestrosModel();
    }

    public function maestrosAction() {
        $this->render('maestros');
    }

    public function getmaestrosAction() {
        echo json_encode($this->maestros->getMaestros());
    }

}