<?php

class Recomendacion extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('soporte.recomendacion');
        $this->hasColumn('idrecomendacion', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'soporte.recomendacion_idrecomendacion'));
        $this->hasColumn('recomendacion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idusuario', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

}