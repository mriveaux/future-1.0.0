<?php

class EscalasalarialModel {

    public $objEscalasalarial;

    public function setUp() {
        
    }

    public function Adicionar($post) {
        try {
            $escalasalarial = new Escalasalarial();
            if ($escalasalarial->buscarEscalasalarial($post->idtipoescala, $post->idgrupoescala, $post->idsalario) == 0) {
                $escalasalarial->idtipoescala = $post->idtipoescala;
                $escalasalarial->idgrupoescala = $post->idgrupoescala;
                $escalasalarial->idsalario = $post->idsalario;
                $escalasalarial->save();
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
            $escalasalarial = new Escalasalarial();
            if ($escalasalarial->buscarEscalasalarial($post->idtipoescala, $post->idgrupoescala, $post->idsalario, $post->idescalasalarial) == 0) {
                $escalasalarial = Doctrine::getTable('Escalasalarial')->find($post->idescalasalarial);
                $escalasalarial->idtipoescala = $post->idtipoescala;
                $escalasalarial->idgrupoescala = $post->idgrupoescala;
                $escalasalarial->idsalario = $post->idsalario;
                $escalasalarial->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function eliminarEscalasalarial($idEscalasalarial) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $this->objEscalasalarial = new Escalasalarial();
            if ($this->objEscalasalarial->isUsed($idEscalasalarial) != -1) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objEscalasalarialDel = Doctrine::getTable('Escalasalarial')->find($idEscalasalarial);
                $objEscalasalarialDel->delete();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

}
