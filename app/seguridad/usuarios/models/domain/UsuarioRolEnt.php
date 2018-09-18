<?php

class UsuarioRolEnt extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('seguridad.usuario_rol_ent');
        $this->hasColumn('idusuariorolentidad', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'seguridad.usuario_rol_ent_idusuariorolentidad'));
        $this->hasColumn('idusuario', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idroles', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Usuarios', array('local' => 'idusuario', 'foreign' => 'idusuario'));
        $this->hasOne('Entidades', array('local' => 'identidad', 'foreign' => 'identidad'));
        $this->hasOne('Roles', array('local' => 'idroles', 'foreign' => 'idroles'));
    }

    public function loadDataUsuarioRolEntidad($idusuario, $idroles, $identidad) {
        $query = Doctrine_Query::create();
        $result = $query->select('e.identidad as id, e.nombre as text, e.padre as leaf, e.idpadre')
                ->from('Entidades e')
                ->where('e.idpadre=' . $identidad)
                ->orderBy('e.orden')
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        $data_result = array();
        foreach ($result as $value) {
            $data = new stdClass();
            $query1 = Doctrine_Query::create();
            $userent = $query1->select('true as accesible')
                    ->from('UsuarioRolEnt ue')
                    ->where('ue.idusuario=' . $idusuario . ' AND ue.idroles=' . $idroles . ' AND ue.identidad=' . $value['id'])
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            if (count($userent) > 0) {
                $data->checked = true;
            } else {
                $data->checked = false;
            }
            $data->id = $value['id'];
            $data->text = $value['text'];
            $data->leaf = $value['leaf'];
            $data->idpadre = $value['idpadre'];
            $data_result[] = $data;
            if ($value['id'] == $_SESSION['identidad']) {
                return array($data);
            }
        }

        return $data_result;
    }

    public function buscarEntidadesRolUsuario($idusuario, $idroles, $idestructura) {
        $query = Doctrine_Query::create();
        $result = $query->select('ue.idusuariorolentidad')
                ->from('UsuarioRolEnt ue')
                ->where('ue.idusuario=' . $idusuario . ' AND ue.idroles=' . $idroles . ' AND ue.identidad=' . $idestructura)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return $result;
    }

    public function existeUserEntidad($identidad) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('UsuarioRolEnt ue')
                ->where('ue.identidad=' . $identidad)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return count($result);
    }

    public function loadLoginEntity() {
        try {
            $idusuario = $_SESSION['datiduser'];
            $query1 = Doctrine_Query::create();
            $userent = $query1->select('ue.identidad')
                    ->from('UsuarioRolEnt ue')
                    ->where('ue.idusuario=' . $idusuario)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            if (count($userent)) {
                $idEnt = array();
                foreach ($userent as $value) {
                    $idEnt[] = $value['identidad'];
                }
                $query = Doctrine_Query::create();
                return $query->select('e.*')
                                ->from('Entidades e')
                                ->whereIn('e.identidad', $idEnt)
                                ->orderby('e.orden,e.nombre')
                                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                                ->execute();
            } else {
                return array();
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getIdRolesByIdUserEntidad($argIdUsuario, $argIdEntidad) {
        $query = Doctrine_Query::create();
        $result = $query->select('ue.idroles')
                ->from('UsuarioRolEnt ue')
                ->where("ue.idusuario= '$argIdUsuario' AND ue.identidad='$argIdEntidad'")
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
        $arrIdRoles = [];
        if (count($result)) {
            foreach ($result as $v) {
                $arrIdRoles[] = $v['idroles'];
            }
        }
        return $arrIdRoles;
    }

}
