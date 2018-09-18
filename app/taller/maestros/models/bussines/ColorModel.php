<?php

class ColorModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addColor($data) {
        try {
            $objcolor = new Color();
            if (!$objcolor->buscarColorByNombre($data->nombre)) {
                $objcolor->nombre = $data->nombre;
                $objcolor->save();
                return 0; //se adiciono correctamente
            }
            else
                return 1; //el color existe
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modColor($data) {
        try {
            $objcolor = new Color();
            if (!$objcolor->buscarColorByNombre($data->nombre)) {
                $color = Doctrine_Core::getTable('Color')->find($data->idcolor);
                $color->nombre = $data->nombre;
                $color->save();
                return 0;
            }
            else
                return 1; //el color existe
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delColor($id) {
        try {
            $color = Doctrine_Core::getTable('Color')->find($id);
            if ($color->delete())
                return 1;
            else
                return 2;//tiene datos asociados
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
