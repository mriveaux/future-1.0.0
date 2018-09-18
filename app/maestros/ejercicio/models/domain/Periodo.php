<?php

class Periodo extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_periodo');
        $this->hasColumn('idperiodo', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.nom_periodo_idperiodo'));
        $this->hasColumn('periodo', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('inicio', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fin', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idejercicio', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Ejercicio', array('local' => 'idejercicio', 'foreign' => 'idejercicio'));
        $this->hasOne('Ejercicio', array('local' => 'idejercicio', 'foreign' => 'idejercicio'));
        $this->hasMany('DatCierre', array('local' => 'idperiodo', 'foreign' => 'idperiodoactual'));
    }

    public function getPeriodos($start = 0, $limit = 0, $idEjercicio = 0) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('p.*')
                    ->from('Periodo p')->offset($start)->limit($limit)
                    ->where("p.idejercicio = $idEjercicio")->orderby("p.inicio")
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadPeriodoByFecha($idFecha) {
        return $result = Doctrine_Manager::getInstance()->getCurrentConnection()
                ->fetchAll("SELECT p.*, f.fecha FROM mod_maestro.dat_periodo p "
                . "INNER JOIN mod_maestro.dat_cierre c ON p.idperiodo = c.idperiodoactual "
                . "INNER JOIN mod_maestro.dat_fecha f ON c.idestructurasubsist = f.idestructurasubsist "
                . "WHERE f.idfecha = $idFecha;");
    }

    public function getPeriodoSubsistema($idEntidad, $idModulo) {
        return $result = Doctrine_Manager::getInstance()->getCurrentConnection()
                ->fetchAll("SELECT p.*, f.fecha FROM mod_maestro.dat_periodo p "
                . "INNER JOIN mod_maestro.dat_cierre c ON p.idperiodo = c.idperiodoactual "
                . "INNER JOIN mod_maestro.dat_fecha f ON c.idestructurasubsist = f.idestructurasubsist "
                . "INNER JOIN mod_maestro.dat_estructurasubsist es ON f.idestructurasubsist = es.idestructurasubsist "
                . "INNER JOIN mod_maestro.nom_subsistema s ON es.idmodulo = s.idmodulo "
                . "WHERE s.idmodulo = $idModulo AND es.identidad = $idEntidad;");
    }

    public function getNextPeriodo($idPeriodo, $idEjercicio, $fechaFin) {
        return $result = Doctrine_Manager::getInstance()->getCurrentConnection()
                ->fetchAll("SELECT p.* FROM mod_maestro.dat_periodo p "
                        . "WHERE p.inicio >= '$fechaFin' AND p.idejercicio = $idEjercicio AND p.idperiodo <> $idPeriodo "
                        . "ORDER BY p.inicio ASC LIMIT 1 OFFSET 0;");
    }

}
