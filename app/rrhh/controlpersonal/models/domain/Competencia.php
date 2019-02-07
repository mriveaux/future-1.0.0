<?php

class Competencia extends Doctrine_Record
{

    public function setUp()
    {
        parent::setUp();
    }

    public function setTableDefinition()
    {
        $this->setTableName('rrhh.dat_competencia');
        $this->hasColumn('id', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_competencia_id'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 30, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fechaexpedido', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechavencimiento', 'date', null, array('notnull' => true, 'primary' => false));
    }

    public function getCompetencias($post)
    {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Competencia c')->offset($post->start)->limit($post->limit)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Competencia c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("c.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("c.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("c.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }
}