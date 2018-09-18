<?php

class Bajatrabajador extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('capitalhumano.bajatrabajador');
        $this->hasColumn('idbajatrabajador', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'capitalhumano.capitalhumano_idbajatrabajador'));
        $this->hasColumn('fechabaja', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('motivo', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idtrabajador', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

}
