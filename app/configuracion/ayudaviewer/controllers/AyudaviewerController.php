<?php

class AyudaviewerController extends ControllerSecure {

    private $ayudaviewerModel;
    private $ayudaviewer;

    public function __construct() {
        parent::__construct();
        $this->ayudaviewerModel = new AyudaviewerModel();
        $this->ayudaviewer = new Ayudaviewer();
    }

    public function ayudaviewerAction() {
        $this->render('ayudaviewer');
    }

    public function cargarayudaAction() {
        echo json_encode($this->ayudaviewer->loadDataAyuda());
    }

}