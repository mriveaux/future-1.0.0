<?php

class FormatoEntidad extends Doctrine_Record
{

    public function setUp()
    {
        $this->hasOne('Formato', array('local' => 'idformato', 'foreign' => 'idformato'));
        parent::setUp();
    }

    public function setTableDefinition()
    {
        $this->setTableName('maestros.dat_formatoentidad');
        $this->hasColumn('idformatoentidad', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.dat_formatoentidad_idformatoentidad'));
        $this->hasColumn('idformato', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

}
