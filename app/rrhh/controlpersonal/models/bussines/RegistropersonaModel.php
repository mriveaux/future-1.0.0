<?php

class RegistropersonaModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function saveRegistropersona($data) {
        try {
            $dat = json_decode($data->_dataPost['datosBasicos']);
            if (!$dat->idpersona) {
                $this->addRegistropersona($dat, $data->_dataPost['foto']);
            } else {
                $this->modRegistropersona($dat, $data->_dataPost['foto']);
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function addRegistropersona($data, $picture) {
        try {
            $registropersona = new Registropersona();
            $registropersona->nombre = $data->nombre;
            $registropersona->apellidos = $data->apellidos;
            $registropersona->sexo = $data->sexo;
            $registropersona->estadocivil = $data->estadocivil;
            $registropersona->idnacionalidad = $data->idnacionalidad;
            $registropersona->identidad = $this->dataSession->identidad;
            if (isset($picture))
                $registropersona->foto = $picture;
            $registropersona->save();
            $docidentidad = new Docidentidad();
            $docidentidad->idcategoriadocidentidad = $data->idcategoriadocidentidad;
            $docidentidad->idpersona = $registropersona->idpersona;
            $docidentidad->numero = $data->numeroidentidad;
            $docidentidad->rector = true;
            $docidentidad->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modRegistropersona($data, $picture) {
        try {
            $registropersona = Doctrine::getTable('Registropersona')->find($data->idpersona);
            $registropersona->nombre = $data->nombre;
            $registropersona->apellidos = $data->apellidos;
            $registropersona->sexo = $data->sexo;
            $registropersona->estadocivil = $data->estadocivil;
            $registropersona->idnacionalidad = $data->idnacionalidad;
            if (isset($picture))
                $registropersona->foto = $picture;
            $registropersona->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delRegistropersona($id) {
        try {
            $registropersona = Doctrine_Core::getTable('Registropersona')->find($id);
            $registropersona->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function setStatusPersona($argIdpersona, $argStatus) {
        try {
            $registropersona = Doctrine::getTable('Registropersona')->find($argIdpersona);
            $registropersona->status = $argStatus;
            $registropersona->save();
            return true;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
