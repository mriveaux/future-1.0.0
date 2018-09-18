<?php

class FenotipoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addFenotipo($data) {
        try {
            $fenotipo = new Fenotipo();
            $fenotipo->idpersona = $data->idpersona;
            if (is_int($data->gruposanguineo))
                $fenotipo->idgruposanguineo = $data->gruposanguineo;
            if (is_int($data->colorojos))
                $fenotipo->idcolorojos = $data->colorojos;
            if (is_int($data->colorpelo))
                $fenotipo->idcolorpelo = $data->colorpelo;
            if (is_int($data->colorpiel))
                $fenotipo->idcolorpiel = $data->colorpiel;
            $fenotipo->estatura = $data->estatura;
            $fenotipo->peso = $data->peso;
            $fenotipo->observacion = $data->observacion;
            $fenotipo->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modFenotipo($data) {
        try {
            $fenotipo = Doctrine_Core::getTable('Fenotipo')->find($data->idfenotipo);
            if (is_int($data->gruposanguineo))
                $fenotipo->idgruposanguineo = $data->gruposanguineo;
            if (is_int($data->colorojos))
                $fenotipo->idcolorojos = $data->colorojos;
            if (is_int($data->colorpelo))
                $fenotipo->idcolorpelo = $data->colorpelo;
            if (is_int($data->colorpiel))
                $fenotipo->idcolorpiel = $data->colorpiel;
            $fenotipo->estatura = $data->estatura;
            $fenotipo->peso = $data->peso;
            $fenotipo->observacion = $data->observacion;
            $fenotipo->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delFenotipo($data) {
        try {
            $fenotipo = Doctrine_Core::getTable('Fenotipo')->find($data->idfenotipo);
            $fenotipo->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
