<?php

class CategoriaocupModel {

    public $objCategoriaocup;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $categoriaocup = new Categoriaocup();
            if ($categoriaocup->buscarCategoriaocup($post->nombre) == 0) {
                $categoriaocup->nombre = $post->nombre;
                $categoriaocup->abreviatura = $post->abreviatura;
                $categoriaocup->save();
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
            $categoriaocup = new Categoriaocup();
            if ($categoriaocup->buscarCategoriaocup($post->nombre, $post->idcategoriaocup) == 0) {
                $categoriaocup = Doctrine::getTable('Categoriaocup')->find($post->idcategoriaocup);
                $categoriaocup->nombre = $post->nombre;
                $categoriaocup->abreviatura = $post->abreviatura;
                $categoriaocup->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarCategoriaocup($idCategoriaocup) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objCategoriaocup = new Categoriaocup();
            if ($this->objCategoriaocup->isUsed($idCategoriaocup) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objCategoriaocupDel = Doctrine::getTable('Categoriaocup')->find($idCategoriaocup);
                $objCategoriaocupDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
