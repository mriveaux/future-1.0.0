<?php

class TipoescalaModel {

    public $objTipoescala;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $tipoescala = new Tipoescala();
            if ($tipoescala->buscarTipoescala($post->nombre) == 0) {
                $tipoescala->nombre = $post->nombre;
                $tipoescala->abreviatura = $post->abreviatura;
                $tipoescala->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe 
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function Modificar($post) {
        try {
            $tipoescala = new Tipoescala();
            if ($tipoescala->buscarTipoescala($post->nombre, $post->idtipoescala) == 0) {
                $tipoescala = Doctrine::getTable('Tipoescala')->find($post->idtipoescala);
                $tipoescala->nombre = $post->nombre;
                $tipoescala->abreviatura = $post->abreviatura;
                $tipoescala->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarTipoescala($idTipoescala) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objTipoescala = new Tipoescala();
            if ($this->objTipoescala->isUsed($idTipoescala) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objTipoescalaDel = Doctrine::getTable('Tipoescala')->find($idTipoescala);
                $objTipoescalaDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
