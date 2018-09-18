<?php

class GrupoescalaModel {

    public $objGrupoescala;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $grupoescala = new Grupoescala();
            if ($grupoescala->buscarGrupoescala($post->nombre) == 0) {
                $grupoescala->nombre = $post->nombre;
                $grupoescala->abreviatura = $post->abreviatura;
                $grupoescala->save();
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
            $grupoescala = new Grupoescala();
            if ($grupoescala->buscarGrupoescala($post->nombre, $post->idgrupoescala) == 0) {
                $grupoescala = Doctrine::getTable('Grupoescala')->find($post->idgrupoescala);
                $grupoescala->nombre = $post->nombre;
                $grupoescala->abreviatura = $post->abreviatura;
                $grupoescala->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarGrupoescala($idGrupoescala) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objGrupoescala = new Grupoescala();
            if ($this->objGrupoescala->isUsed($idGrupoescala) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objGrupoescalaDel = Doctrine::getTable('Grupoescala')->find($idGrupoescala);
                $objGrupoescalaDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
