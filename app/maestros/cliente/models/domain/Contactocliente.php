<?php

class Contactocliente extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Cliente', array('local' => 'idcliente', 'foreign' => 'idcliente'));
    }

    public function setTableDefinition() {
        $this->setTableName('comercial.contactocliente');
        $this->hasColumn('idcontactocliente', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'comercial.contactocliente_idcontactocliente'));
        $this->hasColumn('idcliente', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('cargo', 'character varying', 30, array('notnull' => false, 'primary' => false));
        $this->hasColumn('correos', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('telefonos', 'character varying', 255, array('notnull' => true, 'primary' => false));
    }

}
