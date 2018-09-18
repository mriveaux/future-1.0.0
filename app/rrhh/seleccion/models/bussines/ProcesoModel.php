<?php

class ProcesoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function saveProceso($data) {
        try {
            $dat = json_decode($data->_dataPost['datos']);
            if ($dat->idprocesoseleccion == '') {
                $this->addProceso($dat);
            } else {
                $this->modProceso($dat);
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function addProceso($data) {
        try {
            $proceso = new Proceso();
            $proceso->nombre = $data->nombre;
            $proceso->fechainicio = $data->fechainicio;
            $proceso->fechafin = $data->fechafin;
            $proceso->comite = $data->comite;
            $proceso->observacion = $data->observacion;
            $proceso->cantidad = $data->cantidad;
            $proceso->idcargoplantilla = $data->cargoplantilla;
            $proceso->identidad = $this->dataSession->identidad;
            $proceso->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modProceso($data) {
        try {
            $proceso = Doctrine_Core::getTable('Proceso')->find($data->idprocesoseleccion);
            $proceso->nombre = $data->nombre;
            $proceso->fechainicio = $data->fechainicio;
            $proceso->fechafin = $data->fechafin;
            $proceso->comite = $data->comite;
            $proceso->observacion = $data->observacion;
            $proceso->cantidad = $data->cantidad;
            if (is_int($data->cargoplantilla)) {
                $proceso->idcargoplantilla = $data->cargoplantilla;
            }
            $proceso->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delProceso($id) {
        try {
            $proceso = Doctrine_Core::getTable('Proceso')->find($id);
            $proceso->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function changeStatusProceso($data) {
        try {
            $proceso = Doctrine_Core::getTable('Proceso')->find($data->idprocesoseleccion);
            $proceso->status = $data->status;
            $proceso->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
