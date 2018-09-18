<?php

class Registroempleado extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Registropersona', array('local' => 'idpersona', 'foreign' => 'idpersona'));
        $this->hasOne('Tipocontrato', array('local' => 'idpersona', 'foreign' => 'idpersona'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_empleado');
        $this->hasColumn('idempleado', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.dat_empleado_idempleado'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getRegistroempleadoes($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Registroempleado n')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Registroempleado n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.registroempleado ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.registroempleado ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('n.fecha');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getEmpleadoService($argIdpersona, $argIdEntidad) {
        try {
            $query = Doctrine_Query::create();
            return $query->from('Registroempleado r')
                            ->where("r.idpersona = $argIdpersona AND r.identidad = $argIdEntidad")
                            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
