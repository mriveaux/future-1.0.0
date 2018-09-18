<?php

class Contacto extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Mediocontacto', array('local' => 'idmediocontacto', 'foreign' => 'idmediocontacto'));
        $this->hasOne('Tipocontacto', array('local' => 'idtipocontacto', 'foreign' => 'idtipocontacto'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_contacto');
        $this->hasColumn('idcontacto', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_contacto_idcontacto'));
        $this->hasColumn('idtipocontacto', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idmediocontacto', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('contacto', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('rector', 'numeric', 1, array('notnull' => false, 'primary' => false));
    }

    public function getContacto($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Contacto c')->innerJoin('c.Mediocontacto m')->innerJoin('c.Tipocontacto t')
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Contacto c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("c.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("c.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("c.contacto ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.contacto ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('t.nombre,m.nombre,c.contacto');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListContactosService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Contacto c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
