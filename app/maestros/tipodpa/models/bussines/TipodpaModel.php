<?php

class TipodpaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTipodpa($data) {
        try {
            $tipodpa = new Tipodpa();
            $tipodpa->idtipodpa = $data->idtipodpa;
            $tipodpa->denominacion = $data->denominacion;
            if (isset($data->estado)) {
                if ($data->estado == 2) {
                    $currentDate = new DateTime();
                    $fCurrentDate = $currentDate->format('d/m/Y');
                    $tipodpa->fin = $fCurrentDate;
                } else {
                    $tipodpa->fin = null;
                }
            }
            $tipodpa->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modTipodpa($data) {
        try {
            $tipodpa = Doctrine_Core::getTable('Tipodpa')->find($data->idtipodpa);
            $tipodpa->denominacion = $data->denominacion;
            if (isset($data->estado)) {
                if ($data->estado == 2) {
                    $currentDate = new DateTime();
                    $fCurrentDate = $currentDate->format('d/m/Y');
                    $tipodpa->fin = $fCurrentDate;
                } else {
                    $tipodpa->fin = null;
                }
            }
            $tipodpa->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delTipodpa($data) {
        try {
            $tipodpa = Doctrine_Core::getTable('Tipodpa')->find($data->idtipodpa);
            $tipodpa->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
