<?php

class ReservaController extends ControllerSecure {

    private $reserva;
    private $reservaModel;

    public function __construct() {
        parent::__construct();
        $this->reserva = new Reserva();
        $this->reservaModel = new ReservaModel();
    }

    public function reservaAction() {
        $this->render('reserva');
    }

    public function getreservaAction() {
        echo json_encode($this->reserva->getReservaes());
    }

    public function addreservaAction() {
        echo json_encode($this->reservaModel->addReserva($this->dataPost));
    }

    public function modreservaAction() {
        echo json_encode($this->reservaModel->modReserva($this->dataPost));
    }

    public function delreservaAction() {
        echo json_encode($this->reservaModel->delReserva($this->dataPost));
    }

}