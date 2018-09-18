<?php

class GrupoRolesModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addGrupoRoles($data) {
        try {
            $gruporoles = new GrupoRoles();
            if ($gruporoles->buscarNombreGrupo($data->nombre) == 0) {
                $gruporoles->nombre = $data->nombre;
                $gruporoles->descripcion = $data->descripcion;
                $gruporoles->save();
                return array('success' => true, 'codMsg' => 1); //1 adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function modGrupoRoles($data) {
        try {
            $gruporoles = new GrupoRoles();
            if ($gruporoles->buscarNombreGrupo($data->nombre, $data->idgruporoles) == 0) {
                $gruporoles = Doctrine_Core::getTable('GrupoRoles')->find($data->idgruporoles);
                $gruporoles->nombre = $data->nombre;
                $gruporoles->descripcion = $data->descripcion;
                $gruporoles->save();
                return array('success' => true, 'codMsg' => 1); //1 modifico bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 existe
            }
        } catch (Doctrine_Exception $e) {
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function delGrupoRoles($data) {
        try {
            $gruporoles = Doctrine_Core::getTable('GrupoRoles')->find($data->idgruporoles);
            if ($gruporoles->delete())
                return array('success' => true, 'codMsg' => 1); //1 elimino bien 
        } catch (Doctrine_Exception $e) {
            return array('success' => false, 'codMsg' => 2); //2 tiene datos asociados
        }
    }

    public function saveRolesAssociation($data) {
        try {
            $objRolesModel = new RolesModel();
            if ($objRolesModel->deleteRolesGroupsAssociation($data->idgruporoles)) {
                $arrIdRoles = json_decode($data->arridroles);
                if (count($arrIdRoles)) {
                    return $this->saveRolesGrupo($arrIdRoles, $data->idgruporoles);
                } else {
                    return array('success' => true, 'codMsg' => 1);
                }
            }
        } catch (Exception $exc) {
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    private function saveRolesGrupo($arrIdroles, $argIdGrupoRoles) {
        try {
            foreach ($arrIdroles as $v) {
                $objRolesGrupo = new RolesGrupo();
                $objRolesGrupo->idgruporoles = $argIdGrupoRoles;
                $objRolesGrupo->idroles = $v;
                $objRolesGrupo->save();
            }
            return array('success' => true, 'codMsg' => 1);
        } catch (Exception $exc) {
            return array('success' => false, 'codMsg' => 3); // dio error
        }
    }

    public function loadDataRoles($data) {
        try {
            $objRoles = new Roles();
            $asoc = $objRoles->loadDataRolesGrupoService($data->idgruporoles, $data->criterio);
            return array('data' => $asoc);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
