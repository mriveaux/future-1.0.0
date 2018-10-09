<?php

class Codmercadologico extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Categoriaservicio', array('local' => 'idcategoria', 'foreign' => 'idcategoriaservicio'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_codmercadologico');
        $this->hasColumn('idcodmercadologico', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_codmercadologico_idcodmercadologico'));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcategoria', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function loadDataCodmercadologico($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('c.*, cat.abreviatura as categoriaservicio, cat.color as color')
                    ->from('Codmercadologico c')
                    ->innerJoin('c.Categoriaservicio cat')
                    ->offset($post->start)->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Codmercadologico c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarNombreCodmercadologico($argAbrev, $argName, $argIdCodmercadologico = 0) {
        try {
            $WHERE = ($argIdCodmercadologico === 0) ? "c.abreviatura='$argAbrev' OR c.nombre = '$argName'" : "(c.abreviatura='$argAbrev' OR c.nombre = '$argName') AND c.idcodmercadologico <> '$argIdCodmercadologico'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Codmercadologico c')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
