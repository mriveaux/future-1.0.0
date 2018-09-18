<?php

class EjercicioController extends ControllerSecure {

    private $ejercicio;
    private $ejercicioModel;
    private $periodoModel;

    public function __construct() {
        parent::__construct();
        $this->ejercicio = new Ejercicio();
        $this->ejercicioModel = new EjercicioModel();
        $this->periodoModel = new PeriodoModel();
    }

    public function ejercicioAction() {
        $this->render('ejercicio');
    }

    public function getejerciciosAction() {
        echo json_encode($this->ejercicio->getEjercicios($this->dataRequest));
    }

    public function addejercicioAction() {
        echo json_encode($this->ejercicioModel->addEjercicio());
    }

    public function delejercicioAction() {
        echo json_encode($this->ejercicioModel->delEjercicio());
    }

    public function getperiodosAction() {
        echo json_encode($this->periodoModel->getPeriodos($this->dataPost));
    }

}
