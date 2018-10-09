<?php

class Ura extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_ura');
        $this->hasColumn('idura', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_ura_idura'));
        $this->hasColumn('ura', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function loadDataUras($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Ura u')->offset($post->start)
                    ->limit($post->limit)->where("u.identidad = '" . $post->identidad . "'")->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Ura u')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD); //no se usa por ahora
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("u.ura ilike '%" . $criterio . "%'");
                $queryCount->addWhere("u.ura ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('u.ura');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getUraNombre($argName, $argIdCentro, $argIdUra = 0) {
        try {
            $WHERE = ($argIdUra === 0) ? "u.ura='$argName' AND u.identidad= '$argIdCentro'" : "u.ura='$argName' AND u.identidad= '$argIdCentro' AND u.idura <> '$argIdUra'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Ura u')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
