<?php

abstract class BaseDemanda extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('comercial.demanda');
        $this->hasColumn('iddemanda', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'comercial.demanda_iddemanda'));
        $this->hasColumn('anno', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estado', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidades', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function Setup() {
        parent::setUp();
    }

}
