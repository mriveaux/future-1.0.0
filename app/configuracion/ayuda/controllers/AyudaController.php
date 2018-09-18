<?php

class AyudaController extends ControllerSecure {

    private $ayudaModel;
    private $ayuda;

    public function __construct() {
        parent::__construct();
        $this->ayudaModel = new AyudaModel();
        $this->ayuda = new Ayuda();
    }

    public function ayudaAction() {
        $this->render('ayuda');
    }

    public function cargarayudaAction() {
        echo json_encode($this->ayuda->cargarayuda($this->dataPost->cadena));
    }

    public function loadFuncionalidadesAction() {
        echo json_encode($this->ayuda->loadDataFuncionalidades());
    }

    public function adicionarayudaAction() {
        echo json_encode($this->ayudaModel->adicionarAyuda($this->dataPost));
    }

    public function eliminarayudaAction() {
        echo json_encode($this->ayudaModel->eliminarAyuda($this->dataPost->idconfayuda));
    }

}