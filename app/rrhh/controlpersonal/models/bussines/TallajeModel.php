<?php

class TallajeModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addTallaje($data) {
        try {
            $tallaje = new Tallaje();
            $tallaje->idpersona = $data->idpersona;
            if (is_int($data->prenda))
                $tallaje->idprenda = $data->prenda;
            $tallaje->talla = $data->talla;
            $tallaje->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modTallaje($data) {
        try {
            $tallaje = Doctrine_Core::getTable('Tallaje')->find($data->idtallaje);
            if (is_int($data->prenda))
                $tallaje->idprenda = $data->prenda;
            $tallaje->talla = $data->talla;
            $tallaje->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delTallaje($data) {
        try {
            $tallaje = Doctrine_Core::getTable('Tallaje')->find($data->idtallaje);
            $tallaje->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
