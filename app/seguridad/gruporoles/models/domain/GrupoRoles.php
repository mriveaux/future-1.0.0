<?php

class GrupoRoles extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('seguridad.gruporoles');
        $this->hasColumn('idgruporoles', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'seguridad.gruporoles_idgruporoles'));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function loadDataGrupoRoles($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('GrupoRoles g')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("g.nombre ilike '%" . $criterio . "%' OR g.descripcion ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('g.nombre');
            $result = $query->execute();
            return array('data' => $result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarNombreGrupo($argName, $argIdGrupo = 0) {
        try {
            $WHERE = ($argIdGrupo === 0) ? "g.nombre = '$argName'" : "g.nombre = '$argName' AND g.idgruporoles <> '$argIdGrupo'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('GrupoRoles g')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataGrupoRolesService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('GrupoRoles g')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("g.nombre ilike '%" . $criterio . "%' OR g.descripcion ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('g.nombre');
            $result = $query->execute();
            return array('data' => $result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
