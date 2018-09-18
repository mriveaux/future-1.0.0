<?php

class DirectaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addDirecta($data, $argUser, $argEntidad) {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $directa = new Directa();
            $directa->idusuario = $argUser;
            $directa->idpersona = $data->idpersona;
            $directa->idcargoplantilla = $data->cargoplantilla;
            $directa->observacion = $data->observacion;
            $directa->save();
            if ($directa->identifier()) {
                $objEmpleado = new Registroempleado();
                $objPersona = new RegistropersonaModel();
                $objCargoPlantilla = new CargoplantillaModel();
                $exist = $objEmpleado->getEmpleadoService($data->idpersona, $argEntidad);
                if ($exist) {
                    $objTipocontrato = new Tipocontrato();
                    $objTipocontrato->tipocontrato = $data->tipocontrato;
                    $objTipocontrato->fechainicio = $data->fechainicio;
                    $objTipocontrato->fechafin = $data->fechafin;
                    $objTipocontrato->observacion = $data->observacion;
                    $objTipocontrato->idcargoplantilla = $data->cargoplantilla;
                    $objTipocontrato->idempleado = $exist[0]['idempleado'];
                    $objTipocontrato->save();
                    $objPersona->setStatusPersona($exist[0]['idpersona'], 1);
                    $objCargoPlantilla->ocuparCargoService($data->cargoplantilla);
                } else {
                    $objEmpleado->idpersona = $data->idpersona;
                    $objEmpleado->identidad = $argEntidad;
                    $objEmpleado->save();
                    if ($objEmpleado->identifier()) {
                        $objTipocontrato = new Tipocontrato();
                        $objTipocontrato->tipocontrato = $data->tipocontrato;
                        $objTipocontrato->fechainicio = $data->fechainicio;
                        $objTipocontrato->fechafin = $data->fechafin;
                        $objTipocontrato->observacion = $data->observacion;
                        $objTipocontrato->idcargoplantilla = $data->cargoplantilla;
                        $objTipocontrato->idempleado = $objEmpleado->idempleado;
                        $objTipocontrato->save();
                        $objPersona->setStatusPersona($data->idpersona, 1);
                        $objCargoPlantilla->ocuparCargoService($data->cargoplantilla);
                    } else {
                        $cc->rollback();
                    }
                }
            } else {
                $cc->rollback();
            }
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modDirecta($data) {
        try {
            $directa = Doctrine_Core::getTable('Directa')->find($data->iddirecta);
            $directa->directa = $data->directa;
            $directa->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delDirecta($id) {
        try {
            $directa = Doctrine_Core::getTable('Directa')->find($id);
            $directa->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
