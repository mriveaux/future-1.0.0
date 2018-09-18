<?php

class Nacimiento extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_nacimiento');
        $this->hasColumn('idnacimiento', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_nacimiento_idnacimiento'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombremadre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombrepadre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('registrocivil', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tomo', 'character varying', 10, array('notnull' => false, 'primary' => false));
        $this->hasColumn('folio', 'character varying', 10, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechanacimiento', 'date', null, array('notnull' => false, 'primary' => false));
    }

    public function getNacimiento($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Nacimiento n')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $query->addWhere("n.idpersona = " . $post->_request['idpersona']);
            $result = $query->execute();
            return array('data' => $result, 'total' => count($result));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
