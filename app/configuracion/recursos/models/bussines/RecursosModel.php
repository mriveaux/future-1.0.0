<?php

class RecursosModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addRecurso($data) {
        try {
            $recursos = new Recursos();
            if ($recursos->buscarRecursoRepetido($data->nombre, $data->idbtn, $data->idfuncionalidad) == 0) {
                $recursos->nombre = $data->nombre;
                if ($data->idbtn != '') {
                    $recursos->idbtn = $data->idbtn;
                }
                if ($data->icono != '') {
                    $recursos->icono = $data->icono;
                }
                $recursos->idfuncionalidad = $data->idfuncionalidad;
                $recursos->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modRecurso($data) {
        try {
            $recursos = new Recursos();
            if ($recursos->buscarRecursoRepetido($data->nombre, $data->idbtn, $data->idfuncionalidad, $data->idrecurso) == 0) {
                $recursos = Doctrine_Core::getTable('Recursos')->find($data->idrecurso);
                $recursos->nombre = $data->nombre;
                if ($data->idbtn != '') {
                    $recursos->idbtn = $data->idbtn;
                }
                if ($data->icono != '') {
                    $recursos->icono = $data->icono;
                }
                $recursos->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delRecurso($data) {
        try {
            $recurso = Doctrine_Core::getTable('Recursos')->find($data->idrecurso);
            if ($recurso->delete()) {
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
            }
        } catch (Doctrine_Exception $e) {
            return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        }
    }

    public function loadDataFuncionalidades($argData) {
        if ($argData->node == 'hidden-root') {
            $objMod = new Modulos();
            $data = $objMod->getAllModulesService();
            return $this->formatChildModules($data);
        } else {
            $objFunct = new Funcionalidades();
            if (!strstr($argData->node, '-')) {
                return $objFunct->getFuncionalidadesService($argData);
            } else {
                $argData->node = 0;
                return $objFunct->getFuncionalidadesService($argData);
            }
        }
    }

    private function formatChildModules($arrData) {
        $response = [];
        foreach ($arrData as $v) {
            $data = new stdClass();
            $data->id = 'node-' . $v['idmodulo'];
            $data->idmodulo = $v['idmodulo'];
            $data->idpadre = 0;
            $data->text = $v['nombre'];
            $data->leaf = false;
            $data->descripcion = $v['descripcion'];
            $data->abreviatura = $v['abreviatura'];
            $response[] = $data;
        }
        return $response;
    }

    public function saveActionsAssociation($data) {
        try {
            $objAcciones = new Acciones();
            if ($objAcciones->deleteActionsAssociation($data->idrecurso)) {
                $arrIdAcciones = json_decode($data->arracciones);
                if (count($arrIdAcciones)) {
                    return $this->saveActions($arrIdAcciones, $data->idrecurso);
                } else {
                    return array('success' => true, 'codMsg' => 1);
                }
            }
        } catch (Exception $exc) {
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    private function saveActions($arrIdAcciones, $argIdRecurso) {
        try {
            foreach ($arrIdAcciones as $v) {
                $objAcciones = new Acciones();
                $objAcciones->idrecurso = $argIdRecurso;
                $objAcciones->nombre = $v;
                $objAcciones->save();
            }
            return array('success' => true, 'codMsg' => 1);
        } catch (Exception $exc) {
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

}
