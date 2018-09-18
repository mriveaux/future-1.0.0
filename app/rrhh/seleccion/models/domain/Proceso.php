<?php

class Proceso extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Cargoplantilla', array('local' => 'idcargoplantilla', 'foreign' => 'idcargoplantilla'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_procesoseleccion');
        $this->hasColumn('idprocesoseleccion', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.dat_procesoseleccion_idprocesoseleccion'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechainicio', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechafin', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('comite', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('cantidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('observacion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcargoplantilla', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('status', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getProcesos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Proceso p')->innerJoin('p.Cargoplantilla cp')
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Proceso p')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $identidad = $_SESSION['identidad'];
            $query->addWhere("p.identidad = " . $identidad);
            $queryCount->addWhere("p.identidad = " . $identidad);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("p.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("p.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('p.fechainicio DESC,p.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getCargoPlantilla() {
        $objCargoPlantilla = new Cargoplantilla();
        $cargos = $objCargoPlantilla->getCargosDisponiblesService($_SESSION['identidad']);
        return array('data' => $cargos, 'total' => count($cargos));
    }

    public function getProcesosService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Proceso p')->innerJoin('p.Cargoplantilla cp')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $identidad = $_SESSION['identidad'];
            $query->addWhere("p.identidad = " . $identidad);
            if (isset($post->status)) {
                $arrStatus = implode(',', $post->status);
                $query->addWhere("p.status IN ($arrStatus)");
            }
            $query->addOrderBy('p.fechainicio DESC,p.nombre');
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
