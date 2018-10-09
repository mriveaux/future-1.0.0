<?php

class SalarioModel {

    public $objSalario;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $salario = new Salario();
            if ($salario->buscarSalario($post->salario, $post->idgrupoescala) == 0) {
                $salario->salario = $post->salario;
                $salario->idgrupoescala = $post->idgrupoescala;
                $salario->save();
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
            $salario = new Salario();
            if ($salario->buscarSalario($post->salario, $post->idgrupoescala, $post->idsalario) == 0) {
                $salario = Doctrine::getTable('Salario')->find($post->idsalario);
                $salario->salario = $post->salario;
                $salario->idgrupoescala = $post->idgrupoescala;
                $salario->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarSalario($idSalario) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objSalario = new Salario();
            if ($this->objSalario->isUsed($idSalario) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objSalarioDel = Doctrine::getTable('Salario')->find($idSalario);
                $objSalarioDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
