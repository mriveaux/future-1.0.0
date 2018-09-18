<?php

class ReservaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addReserva($data) {
        try {
            $reserva = new Reserva();
            $reserva->idreserva = $data->idreserva;
            $reserva->reserva = $data->reserva;
            $reserva->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modReserva($data) {
        try {
            $reserva = Doctrine_Core::getTable('Reserva')->find($data->idreserva);
            $reserva->reserva = $data->reserva;
            $reserva->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delReserva($id) {
        try {
            $reserva = Doctrine_Core::getTable('Reserva')->find($id);
            $reserva->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
