<?php

class RolesFunct extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('seguridad.roles_funct');
        $this->hasColumn('idfuncionalidades', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idroles', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idrolesfunct', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'seguridad.roles_funct_idrolesfunct'));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Roles', array('local' => 'idroles', 'foreign' => 'idroles'));
        $this->hasOne('Funcionalidades', array('local' => 'idfuncionalidades', 'foreign' => 'idfuncionalidades'));
    }

    //busca los datos una userEntidad dado el usuario y el idestructura
    public function buscarFuncionalidadesRoles($idrol, $idfuncionalidad) {
        //se cargan las funcionalidades
        $query = Doctrine_Query::create();
        $result = $query->select('rf.idrolesfunct')
                ->from('RolesFunct rf')
                ->where('rf.idroles=' . $idrol . ' AND rf.idfuncionalidades=' . $idfuncionalidad)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return $result;
    }

    //busca los datos una userEntidad dado el usuario y el idestructura
    public function buscarPorIdrol($idrol) {
        //se cargan las funcionalidades
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('RolesFunct rf')
                ->where('rf.idroles=' . $idrol)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return count($result);
    }

    //devuelve si la funcionalidad esta asociada a algun rol
    public function buscarFuncionalidadAsociada($idfuncionalidad) {
        $condicion = "rf.idfuncionalidades='$idfuncionalidad'";
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('RolesFunct rf')
                ->where($condicion)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return count($result);
    }

}
