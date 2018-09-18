<?php

class Bajavehiculo extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('taller.dat_bajavehiculo');
        $this->hasColumn('idbajavehiculo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.dat_bajavehiculo_idbajavehiculo'));
        $this->hasColumn('idregistrovehiculo', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechaorden', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('numeroorden', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('motivo', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('numeroentrega', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechaentrega', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('destino', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Registrovehiculo', array('local' => 'idregistrovehiculo', 'foreign' => 'idregistrovehiculo'));
    }

}