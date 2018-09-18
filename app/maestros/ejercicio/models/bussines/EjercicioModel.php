<?php

class EjercicioModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function createEjercicio($arrayEjercicio) {
        try {
            $isOne = ($arrayEjercicio == 0) ? true : false; //true si es el primer ejercicio
            $nuevoEjercicio = new Ejercicio();
            $nuevoEjercicio->ejercicio = ($isOne) ? Date('Y') : $arrayEjercicio['ejercicio'] + 1;
            $nuevoEjercicio->inicio = ($isOne) ? Date('Y') . '-01-01' : ($arrayEjercicio['ejercicio'] + 1) . '-01-01';
            $nuevoEjercicio->fin = ($isOne) ? Date('Y') . '-12-31' : ($arrayEjercicio['ejercicio'] + 1) . '-12-31';
            $nuevoEjercicio->antecesor = ($isOne) ? 0 : $arrayEjercicio['idejercicio'];
            $nuevoEjercicio->save();
            return array('id' => $nuevoEjercicio->idejercicio, 'anno' => $nuevoEjercicio->ejercicio);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function addEjercicio() {
        try {
            $objEjercicio = new Ejercicio();
            $arrayLastEjercicio = $objEjercicio->getLastEjercicio();
            $arrayCurrentEjercicio = self::createEjercicio($arrayLastEjercicio);
            $objPeriodo = new PeriodoModel();
            return $objPeriodo->addPeriodo($arrayCurrentEjercicio['id'], $arrayCurrentEjercicio['anno']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function delEjercicio() {
        try {
            $flagIdEjercicio = self::testDeleteEjercicio();
            if ($flagIdEjercicio) {
                $objCurrentEjercicio = Doctrine_Core::getTable('Ejercicio')->find($flagIdEjercicio);
                $objCurrentEjercicio->delete(); //se elimina en cascada
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function testDeleteEjercicio() {
        $objEjercicio = new Ejercicio();
        $arrayLastEjercicio = $objEjercicio->getLastEjercicio();
        if ($arrayLastEjercicio['idejercicio']) {//si se esta eliminando el ultimo
//            $cierre = new DatCierre();
//            $exist = $cierre->getCierreByEjercicio($lastEj['idejercicio']);
//            return (count($exist)) ? false : $lastEj['idejercicio'];
            return $arrayLastEjercicio['idejercicio'];
        } else {
            return false;
        }
    }

}
