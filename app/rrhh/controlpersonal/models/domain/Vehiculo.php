<?php

class Vehiculo extends Doctrine_Record
{

    public function setUp()
    {
        parent::setUp();
        $this->hasMany('Registropersona', array('local' => 'idpersona', 'foreign' => 'idpersona'));
        $this->hasMany('Registrovehiculo', array('local' => 'idvehiculo', 'foreign' => 'idregistrovehiculo'));
    }

    public function setTableDefinition()
    {
        $this->setTableName('rrhh.dat_vehiculo');
        $this->hasColumn('id', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_vehiculo_id'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idvehiculo', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechaexpedido', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechavencimiento', 'date', null, array('notnull' => true, 'primary' => false));
    }

    public function getVehiculos($post)
    {
        try {
            $query = Doctrine_Query::create();
            $query->select('c.*, r.nomatricula as nomatricula')
                ->from('Vehiculo c')
                ->leftJoin('c.Registrovehiculo r')
                ->offset($post->start)->limit($post->limit)
                ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("c.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("r.nomatricula ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('r.nomatricula');
            $result = $query->execute();
            $count = $query->count();
            return array('data' => $result->toArray(), 'total' => $count);
        } catch (Exception $exc) {
            throw $exc;
        }
    }
}