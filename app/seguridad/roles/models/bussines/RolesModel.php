<?php

class RolesModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function Adicionar($nombre, $descripcion) {
        try {
            $objRoles = new Roles();
            $existe = $objRoles->buscarRolporNombre($nombre);
            if (!$existe) {
                $objRol = new Roles();
                $objRol->nombre = $nombre;
                $objRol->descripcion = $descripcion;
                $objRol->save();
                return 0;
            } else {
                return 1;
            }
        } catch (Exception $exc) {
            return 2;
        }
    }

    public function Modificar($idrol, $nombre, $descripcion) {
        try {
            $objRol = Doctrine_Core::getTable('Roles')->find($idrol);
            $objRol->nombre = $nombre;
            $objRol->descripcion = $descripcion;
            $objRol->save();
            return true;
        } catch (Exception $exc) {
            return false;
        }
    }

    public function Eliminar($idrol) {
        try {
            $objRolesFunct = new RolesFunct();
            if ($objRolesFunct->buscarPorIdrol($idrol) > 0) {
                return 1;
            } else {
                $objRol = Doctrine_Core::getTable('Roles')->find($idrol);
                $objRol->delete();
                return 2;
            }
        } catch (Exception $exc) {
            return 3;
        }
    }

    public function deleteRolesGroupsAssociation($argIdGruporoles) {
        try {
            $objRolesGrupo = Doctrine_Core::getTable('RolesGrupo')->findBy('idgruporoles', $argIdGruporoles);
            $objRolesGrupo->delete();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
            return 3;
        }
    }

    public function saveRolesGroupsAssociation($idrol) {
        try {
            $objRolesFunct = new RolesFunct();
            if ($objRolesFunct->buscarPorIdrol($idrol) > 0) {
                return 1;
            } else {
                $objRol = Doctrine_Core::getTable('Roles')->find($idrol);
                $objRol->delete();
                return 2;
            }
        } catch (Exception $exc) {
            return 3;
        }
    }

    public function saveRolesFunct($post) {
        try {
            $my_objRolesFunct = new RolesFunct();
            $idrol = $post->idrol;
            $idfuncionalidadescheck = json_decode(stripslashes($post->idfuncionalidadescheck));
            $idfuncionalidadesuncheck = json_decode(stripslashes($post->idfuncionalidadesuncheck));
            if ($idfuncionalidadesuncheck != null && count($idfuncionalidadesuncheck) > 0) {
                foreach ($idfuncionalidadesuncheck as $v) {
                    $idrolesFunct = $my_objRolesFunct->buscarFuncionalidadesRoles($idrol, $v);
                    if (count($idrolesFunct) > 0) {
                        $obj = Doctrine_Core::getTable('RolesFunct')->find($idrolesFunct[0]['idrolesfunct']);
                        $obj->delete();
                    }
                }
            }
            if ($idfuncionalidadescheck != null && count($idfuncionalidadescheck) > 0) {
                foreach ($idfuncionalidadescheck as $v) {
                    $idrolesFunct = $my_objRolesFunct->buscarFuncionalidadesRoles($idrol, $v);
                    if (count($idrolesFunct) == 0) {
                        $objRolesFunct = new RolesFunct();
                        $objRolesFunct->idfuncionalidades = $v;
                        $objRolesFunct->idroles = $idrol;
                        $objRolesFunct->save();
                    }
                }
            }
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveAccesoRecursos($post) {
        try {
            $objRolesFunctRecurso = new RolesFunctRecurso();
            $objRolesFunctRecurso->deleteAssociation($post->idrolesfunct);
            $recursos = json_decode($post->arridrecursos);
            if (count($recursos)) {
                $this->saveResourcesData($recursos, $post->idrolesfunct);
            }
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function saveResourcesData($arrRecursos, $idRolesFunct) {
        try {
            foreach ($arrRecursos as $v) {
                $objRolesFunctRecurso = new RolesFunctRecurso();
                $objRolesFunctRecurso->idrolesfunct = $idRolesFunct;
                $objRolesFunctRecurso->idrecurso = $v;
                $objRolesFunctRecurso->save();
            }
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataFuncionalidadByRol($argData) {
        try {
            $objFunct = new Funcionalidades();
            return array('campos' => $objFunct->getFuncionalidadesRolService(array($argData->idrol)));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataRecursoByFuncionalidad($argData) {
        try {
            $objRolesFunctRecurso = new RolesFunctRecurso();
            $asoc = $objRolesFunctRecurso->loadDataRecursoByRolFuncionalidad($argData->ididrolesfunct, $argData->idfuncionalidad);
            return array('campos' => $asoc);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
