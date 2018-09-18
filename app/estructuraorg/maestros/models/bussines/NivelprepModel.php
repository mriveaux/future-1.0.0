<?php

class NivelprepModel {

    public $objNivelprep;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $nivelprep = new Nivelprep();
            if ($nivelprep->buscarNivelprep($post->nombre) == 0) {
                $nivelprep->nombre = $post->nombre;
                $nivelprep->abreviatura = $post->abreviatura;
                $nivelprep->save();
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
            $nivelprep = new Nivelprep();
            if ($nivelprep->buscarNivelprep($post->nombre, $post->idnivelprep) == 0) {
                $nivelprep = Doctrine::getTable('Nivelprep')->find($post->idnivelprep);
                $nivelprep->nombre = $post->nombre;
                $nivelprep->abreviatura = $post->abreviatura;
                $nivelprep->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarNivelprep($idNivelprep) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objNivelprep = new Nivelprep();
            if ($this->objNivelprep->isUsed($idNivelprep) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objNivelprepDel = Doctrine::getTable('Nivelprep')->find($idNivelprep);
                $objNivelprepDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
