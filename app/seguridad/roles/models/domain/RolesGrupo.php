<?php

class RolesGrupo extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Roles', array('local' => 'idroles', 'foreign' => 'idroles'));
    }

    public function setTableDefinition() {
        $this->setTableName('seguridad.roles_grupo');
        $this->hasColumn('idrolesgrupo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'seguridad.gruporoles_idgruporoles'));
        $this->hasColumn('idgruporoles', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idroles', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

}
