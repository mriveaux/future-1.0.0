<?php

class MaestrosController extends ControllerSecure {

    public function __construct() {
        parent::__construct();
    }

    public function maestrosAction() {
        $this->render('maestros');
    }

    public function loadTreeMaestrosAction() {
        $masters = new MaestrosModel();
        echo json_encode($masters->loadListMasters());
    }

}