<?php

class OperacionesModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addOperaciones($data) {
        try {
            $operaciones = new Operaciones();
            if ($operaciones->getOperacionByNombre($data->operacion, $data->codigo, $data->categoria) == 0) {
                $operaciones->codigo = $data->codigo;
                $operaciones->operacion = $data->operacion;
                $operaciones->tnorma = $data->costo;
                $operaciones->tarifa = $data->tarifa;
                $operaciones->categoria = $data->categoria;
                $operaciones->idactividad = $data->idactividad;
                $operaciones->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe la operacion
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modOperaciones($data) {
        try {
            $objoper = new Operaciones();
            if ($objoper->getOperacionByNombre($data->operacion, $data->codigo, $data->categoria, $data->idoperacion) == 0) {
                $objoper = Doctrine_Core::getTable('Operaciones')->find($data->idoperacion);
                $objoper->codigo = $data->codigo;
                $objoper->operacion = $data->operacion;
                $objoper->tnorma = $data->costo;
                $objoper->tarifa = $data->tarifa;
                $objoper->categoria = $data->categoria;
                $objoper->idactividad = $data->idactividad;
                $objoper->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe la operacion
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delOperaciones($id) {
        try {
            $objoper = Doctrine_Core::getTable('Operaciones')->find($id);
            if ($objoper->delete()) {
                return 1; //elimino
            } else {
                return 2; //tiene datos asociados
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function listActividades() {
        try {
            $obj_Actividad = new Actividad();
            return $obj_Actividad->getActividadService();
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function activarDesactivar($data) {
        try {
            $objoper = Doctrine_Core::getTable('Operaciones')->find($data->idoperacion);
            $objoper->activa = $data->activar;
            $objoper->save();
            return 1; // se cambio correctamente
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function loadDataPreview() {
        $obj = new Operaciones();
        $datoGeneral = new stdClass();
        $dato_cuerpo = $obj->getAllOperationsService();
        $datoGeneral->reporte = 'TALL001';
        $datoGeneral->titulo = 'Operaciones normadas para el taller';
        $datoGeneral->entidad = $_SESSION['desc_entidad'];
        return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $dato_cuerpo);
    }

}
