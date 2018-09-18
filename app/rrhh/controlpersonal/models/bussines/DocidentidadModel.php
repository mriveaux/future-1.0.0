<?php

class DocidentidadModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addDocidentidad($data) {
        try {
            $docidentidad = new Docidentidad();
            $docidentidad->idpersona = $data->idpersona;
            if (is_int($data->categoriadoc))
                $docidentidad->idcategoriadocidentidad = $data->categoriadoc;
            if (isset($data->fechaexpedicion)) {
                $tempE_date = explode('T', $data->fechaexpedicion);
                $docidentidad->fechaexpedicion = $tempE_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tempV_date = explode('T', $data->fechavencimiento);
                $docidentidad->fechavencimiento = $tempV_date[0];
            }
            $docidentidad->numero = $data->numero;
            $docidentidad->rector = (isset($data->rector)) ? 1 : 0;
            if ($docidentidad->rector == 1)
                $this->setRector($data->idpersona);
            $docidentidad->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modDocidentidad($data) {
        try {
            $docidentidad = Doctrine_Core::getTable('Docidentidad')->find($data->iddocidentidad);
            if (is_int($data->categoriadoc))
                $docidentidad->idcategoriadocidentidad = $data->categoriadoc;
            if (isset($data->fechaexpedicion)) {
                $tempE_date = explode('T', $data->fechaexpedicion);
                $docidentidad->fechaexpedicion = $tempE_date[0];
            }
            if (isset($data->fechavencimiento)) {
                $tempV_date = explode('T', $data->fechavencimiento);
                $docidentidad->fechavencimiento = $tempV_date[0];
            }
            $docidentidad->numero = $data->numero;
            $docidentidad->rector = (isset($data->rector)) ? 1 : 0;
            if ($docidentidad->rector == 1)
                $this->setRector($data->idpersona);
            $docidentidad->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delDocidentidad($data) {
        try {
            $docidentidad = Doctrine_Core::getTable('Docidentidad')->find($data->iddocidentidad);
            $docidentidad->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    private function setRector($idpersona) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        $cc->fetchAll("UPDATE rrhh.dat_docidentidad 
                        SET rector = 0
                        WHERE idpersona = $idpersona");
    }

}
