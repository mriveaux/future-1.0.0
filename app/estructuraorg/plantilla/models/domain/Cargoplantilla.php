<?php

class Cargoplantilla extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Tipocargo', array('local' => 'idtipocargo', 'foreign' => 'idtipocargo'));
        $this->hasOne('Tipoescala', array('local' => 'idtipoescala', 'foreign' => 'idtipoescala'));
        $this->hasOne('Grupoescala', array('local' => 'idgrupoescala', 'foreign' => 'idgrupoescala'));
        $this->hasOne('Salario', array('local' => 'idsalario', 'foreign' => 'idsalario'));
        $this->hasOne('Nivelprep', array('local' => 'idnivelprep', 'foreign' => 'idnivelprep'));
        $this->hasOne('Categoriaocup', array('local' => 'idcategoriaocup', 'foreign' => 'idcategoriaocup'));
        $this->hasOne('Areaentidad', array('local' => 'idareaentidad', 'foreign' => 'idareaentidad'));
    }

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.cargoplantilla');
        $this->hasColumn('idcargoplantilla', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.cargoplantilla_idcargoplantilla'));
        $this->hasColumn('idtipocargo', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idtipoescala', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idgrupoescala', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idsalario', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idnivelprep', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcategoriaocup', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idareaentidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('cantidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('cantocupado', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function loadDataCargoPlantilla($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('cp.*, tc.nombre, te.nombre, s.salario, np.nombre, co.nombre, ae.*, ge.nombre')
                    ->from('Cargoplantilla cp')
                    ->innerJoin('cp.Tipocargo tc')
                    ->innerJoin('cp.Tipoescala te')
                    ->innerJoin('cp.Grupoescala ge')
                    ->innerJoin('cp.Salario s')
                    ->innerJoin('cp.Nivelprep np')
                    ->innerJoin('cp.Categoriaocup co')
                    ->innerJoin('cp.Areaentidad ae')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $queryCount->from('Cargoplantilla cp')
                    ->innerJoin('cp.Tipocargo tc')
                    ->innerJoin('cp.Tipoescala te')
                    ->innerJoin('cp.Grupoescala ge')
                    ->innerJoin('cp.Salario s')
                    ->innerJoin('cp.Nivelprep np')
                    ->innerJoin('cp.Categoriaocup co')
                    ->innerJoin('cp.Areaentidad ae')
                    ->setHydrationMode(Doctrine::HYDRATE_RECORD);

            $query->addWhere("cp.identidad = " . $post->identidad);
            $queryCount->addWhere("cp.identidad = " . $post->identidad);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("cp.nombre ilike '%" . $criterio . "%' OR 
                                  tc.nombre ilike '%" . $criterio . "%' OR 
                                  te.nombre ilike '%" . $criterio . "%' OR 
                                  ge.nombre ilike '%" . $criterio . "%' OR 
                                  np.nombre ilike '%" . $criterio . "%' OR 
                                  ae.nombre ilike '%" . $criterio . "%' OR 
                                  co.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("cp.nombre ilike '%" . $criterio . "%' OR 
                                  tc.nombre ilike '%" . $criterio . "%' OR 
                                  te.nombre ilike '%" . $criterio . "%' OR 
                                  ge.nombre ilike '%" . $criterio . "%' OR 
                                  np.nombre ilike '%" . $criterio . "%' OR 
                                  ae.nombre ilike '%" . $criterio . "%' OR 
                                  co.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('ae.nombre, cp.nombre ASC');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function existCargoPlantilla($argNombre, $argIdentidad, $argIdCargo = 0) {
        $WHERE = ($argIdCargo == 0) ? "cp.nombre = '$argNombre' AND cp.identidad = $argIdentidad" : "cp.nombre = '$argNombre' AND cp.identidad = $argIdentidad AND cp.idcargoplantilla <> $argIdCargo";
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Cargoplantilla cp')
                ->where($WHERE)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return (count($result) > 0) ? 1 : 0; // 1-> encontro, 0->no encontro     
    }

    public function getCargosDisponiblesService($argIdentidad) {
        try {
            $query = Doctrine_Query::create();
            $query->select('cp.*, (cp.cantidad - cp.cantocupado) as disponible, tc.nombre, te.nombre, s.salario, np.nombre, co.nombre, ae.nombre, ge.nombre')
                    ->from('Cargoplantilla cp')
                    ->innerJoin('cp.Tipocargo tc')
                    ->innerJoin('cp.Tipoescala te')
                    ->innerJoin('cp.Grupoescala ge')
                    ->innerJoin('cp.Salario s')
                    ->innerJoin('cp.Nivelprep np')
                    ->innerJoin('cp.Categoriaocup co')
                    ->innerJoin('cp.Areaentidad ae')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $query->addWhere("cp.identidad = " . $argIdentidad);
            $query->addWhere("cp.cantocupado < cp.cantidad");
            $query->addOrderBy('ae.nombre, cp.nombre ASC');
            return $query->execute();
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    public function getSimpleCargosDisponiblesService($argIdentidad) {
        try {
            $query = Doctrine_Query::create();
            $query->select('cp.*, (cp.cantidad - cp.cantocupado) as disponible')
                    ->from('Cargoplantilla cp')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $query->addWhere("cp.identidad = " . $argIdentidad);
            $query->addWhere("cp.cantocupado < cp.cantidad");
            $query->addOrderBy('cp.nombre ASC');
            return $query->execute();
        } catch (Exception $exc) {
            echo $exc;
        }
    }

}
