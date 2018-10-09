<?php

class TipocargoModel {

    public $objTipocargo;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $tipocargo = new Tipocargo();
            if ($tipocargo->buscarTipocargo($post->nombre) == 0) {
                $tipocargo->nombre = $post->nombre;
                $tipocargo->abreviatura = $post->abreviatura;
                $tipocargo->save();
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
            $tipocargo = new Tipocargo();
            if ($tipocargo->buscarTipocargo($post->nombre, $post->idtipocargo) == 0) {
                $tipocargo = Doctrine::getTable('Tipocargo')->find($post->idtipocargo);
                $tipocargo->nombre = $post->nombre;
                $tipocargo->abreviatura = $post->abreviatura;
                $tipocargo->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarTipocargo($idTipocargo) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objTipocargo = new Tipocargo();
            if ($this->objTipocargo->isUsed($idTipocargo) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objTipocargoDel = Doctrine::getTable('Tipocargo')->find($idTipocargo);
                $objTipocargoDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
