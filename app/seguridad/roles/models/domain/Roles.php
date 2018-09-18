<?php

class Roles extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('seguridad.roles');
        $this->hasColumn('idroles', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'seguridad.roles_idroles'));
        $this->hasColumn('descripcion', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasMany('RolesFunct', array('local' => 'idroles', 'foreign' => 'idroles'));
        $this->hasMany('RolesGrupo', array('local' => 'idroles', 'foreign' => 'idroles'));
    }

    public function cargarRoles($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Roles r')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Roles r')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere(" r.nombre ilike '%" . $criterio . "%' OR  r.descripcion ilike '%" . $criterio . "%'");
                $queryCount->addWhere(" r.nombre ilike '%" . $criterio . "%' OR  r.descripcion ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('r.nombre');

            $result = $query->execute();
            $count = $queryCount->execute();

            return array('campos' => $result, 'totalrecords' => count($count));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarRolporNombre($nombre) {
        try {
            $wherenombre = "r.nombre='$nombre'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Roles r')
                    ->where($wherenombre)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            if (count($result) > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataRolesGrupoService($argIdGrupo, $argCriterio = null) {
        try {
            $WHERE = "rgr.idgruporoles = '$argIdGrupo' AND r.idroles = rl.idroles";

            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SELECT = "r.*, (SELECT true FROM seguridad.roles rl INNER JOIN seguridad.roles_grupo rgr ON (rl.idroles = rgr.idroles) WHERE $WHERE) as asociado";
            $ORDER_BY = " ORDER BY r.nombre";
            if ($argCriterio != null) {
                $WHERE_ALL = "r.nombre ILIKE '%$argCriterio%' OR r.descripcion ILIKE '%$argCriterio%'";
                $SQL = "SELECT $SELECT FROM seguridad.roles r LEFT JOIN seguridad.roles_grupo rg ON (r.idroles = rg.idroles) WHERE $WHERE_ALL $ORDER_BY";
            } else {
                $SQL = "SELECT $SELECT FROM seguridad.roles r LEFT JOIN seguridad.roles_grupo rg ON (r.idroles = rg.idroles) $ORDER_BY";
            }
            return $cc->fetchAll($SQL);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataRolesPorGrupoService($argIdGrupo) {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $WHERE = "rg.idgruporoles = '$argIdGrupo'";
            $SELECT = "r.*, rg.*";
            $ORDER_BY = " ORDER BY r.nombre";
            $SQL = "SELECT $SELECT FROM seguridad.roles r INNER JOIN seguridad.roles_grupo rg ON (r.idroles = rg.idroles) WHERE $WHERE $ORDER_BY";
            return $cc->fetchAll($SQL);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
