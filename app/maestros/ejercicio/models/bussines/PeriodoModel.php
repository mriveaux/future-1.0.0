<?php

class PeriodoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function getPeriodos($argparams) {
        try {
            $objPeriodo = new Periodo();
            return array('data' => $objPeriodo->getPeriodos($argparams->start, $argparams->limit, $argparams->idejercicio));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function addPeriodo($idEjercicio, $ejercicio) {
        $meses = array('01' => 'Enero', '02' => 'Febrero', '03' => 'Marzo', '04' => 'Abril', '05' => 'Mayo', '06' => 'Junio', '07' => 'Julio', '08' => 'Agosto', '09' => 'Septiembre', '10' => 'Octubre', '11' => 'Noviembre', '12' => 'Diciembre');
        for ($i = 1; $i <= 12; $i++) {
            $objPeriodo[$i - 1] = new Periodo();
            $fin = mktime(0, 0, 0, $i, 0, $ejercicio);
            $ffin = $ejercicio . '-' . strftime("%m", $fin) . '-' . strftime("%d", $fin);
            $finicio = $ejercicio . '-' . strftime("%m", $fin) . '-' . '1';
            $objPeriodo[$i - 1]->periodo = $meses[strftime("%m", $fin)];
            $objPeriodo[$i - 1]->inicio = $finicio;
            $objPeriodo[$i - 1]->fin = $ffin;
            $objPeriodo[$i - 1]->idejercicio = $idEjercicio;
        }
        return self::savePeriodo($objPeriodo);
    }

    public function savePeriodo($arrayPeriodos) {
        try {
            foreach ($arrayPeriodos as $objPeriodo) {
                $objPeriodo->save();
            }
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deletePeriodo($idEjercicio) {
        $query = Doctrine_Query::create();
        try {
            $delete = $query->delete()
                    ->from('Periodo e')
                    ->where("e.idejercicio = $idEjercicio")
                    ->execute();
            return $delete;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getPeriodo($idPeriodo) {
        $objDoctrine = Doctrine_Manager::getInstance();
        $connection = $objDoctrine->getCurrentConnection();
        return $result = $connection->fetchAll("SELECT e.* FROM mod_maestro.dat_periodo e WHERE e.idperiodo = $idPeriodo;");
    }

}
