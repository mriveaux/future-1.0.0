<?php

class Recursos extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('configuracion.dat_recurso');
        $this->hasColumn('idrecurso', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'configuracion.dat_recurso_idrecurso'));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idbtn', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('icono', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idfuncionalidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function loadDataRecursos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $idfunct = $post->idfuncionalidad;
            $query->from('Recursos r')->where("r.idfuncionalidad = $idfunct")->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Recursos r')->where("r.idfuncionalidad = $idfunct")->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("r.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("r.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('r.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarRecursoRepetido($argName, $argIdBtn, $argIdFunct, $argIdRecurso = 0) {
        try {
            $NOT_GENERIC = ($argIdBtn != '') ? "OR r.idbtn = '$argIdBtn'" : "";
            $WHERE = ($argIdRecurso === 0) ? "(r.nombre = '$argName' $NOT_GENERIC) AND r.idfuncionalidad = '$argIdFunct'" : "(r.nombre = '$argName' $NOT_GENERIC) AND r.idfuncionalidad = '$argIdFunct' AND r.idrecurso <> '$argIdRecurso'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Recursos r')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
