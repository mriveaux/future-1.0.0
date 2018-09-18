<?php

class Operaciones extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Actividad', array('local' => 'idactividad', 'foreign' => 'idactividad'));
    }

    public function setTableDefinition() {
        $this->setTableName('taller.nom_operaciones');
        $this->hasColumn('idoperacion', 'integer', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_operaciones_idoperacion'));
        $this->hasColumn('codigo', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('operacion', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tnorma', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tarifa', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('activa', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('categoria', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idactividad', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function getOperaciones($post) {
        try {
            $categorias = Array($post->categoria);
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select("o.*, a.*")->from('Operaciones o')->innerJoin("o.Actividad a")->whereIn('o.categoria', $categorias)
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Operaciones o')->innerJoin("o.Actividad a")->whereIn('o.categoria', $categorias)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("o.operacion ilike '%" . $criterio . "%' OR o.codigo ilike '%" . $criterio . "%' OR a.actividad ilike '%" . $criterio . "%'");
                $queryCount->addWhere("o.operacion ilike '%" . $criterio . "%' OR o.codigo ilike '%" . $criterio . "%' OR a.actividad ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('o.activa DESC, a.nombre, o.operacion, o.codigo');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getOperacionByNombre($nomb, $codigo, $categoria, $idoperacion = null) {
        try {
            $WHERE = ($idoperacion) ? "(o.operacion='$nomb' OR o.codigo='$codigo') AND o.categoria='$categoria' AND o.idoperacion<> '$idoperacion'" : "(o.operacion='$nomb' OR o.codigo='$codigo') AND o.categoria='$categoria'";
            $query = Doctrine_Query::create();
            $result = $query->select('o.*')
                    ->from('Operaciones o')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine::HYDRATE_RECORD)
                    ->execute();
            return ($result->count() > 0) ? 1 : 0; //1-encontro 0-no encont
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAllOperationsService($tipo = Array(1, 2, 3, 4)) {
        try {
            $arrayTipo = array(0);
            $categorias = array_merge($arrayTipo, $tipo);
            $query = Doctrine_Query::create();
            $result = $query->select("o.*, CONCAT(o.codigo,' ', o.operacion) as text, a.nombre as actividad, a.*")
                    ->from('Operaciones o')
                    ->innerJoin("o.Actividad a")
                    ->where('o.activa=1')
                    ->whereIn('o.categoria', $categorias)
                    ->orderby('a.nombre, o.operacion, o.codigo')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();

            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
