<?php

class OrganismoModel {

    public function setUp() {
        
    }

    public function Adicionar($argRequest) {
        try {
            $organismo = new Organismo();
            if ($organismo->buscarOrganismo($argRequest['nombre']) == 0) {
                $organismo->nombre = $argRequest['nombre'];
                $organismo->abreviatura = $argRequest['abreviatura'];
                $organismo->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Modificar($argRequest) {
        try {
            $organismo = new Organismo();
            if ($organismo->buscarOrganismo($argRequest['nombre'], $argRequest['idorganismo']) == 0) {
                $organismo = Doctrine::getTable('Organismo')->find($argRequest['idorganismo']);
                $organismo->nombre = $argRequest['nombre'];
                $organismo->abreviatura = $argRequest['abreviatura'];
                $organismo->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Eliminar($idorganismo) {
        try {
            $objUnidad = Doctrine::getTable('Organismo')->find($idorganismo);
            $objUnidad->delete();
            return 1; //elimino
        } catch (Doctrine_Exception $e) {
            return 2; //tiene datos asociados
            throw $e;
        }
    }

}
