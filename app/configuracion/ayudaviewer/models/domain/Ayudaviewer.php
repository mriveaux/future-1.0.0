<?php

class Ayudaviewer {

    public function setUp() {
        parent::setUp();
    }

    public function loadDataAyuda() {
        $idroles = implode(",", $_SESSION['arridroles']);
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        $SELECT = "ca.*, f.idfuncionalidades, f.nombre, f.descripcion, f.indice as indice, m.idmodulo, m.nombre as modulo, m.indice as modindice";
        $SQL = "SELECT $SELECT
                        FROM configuracion.conf_ayuda ca
                        LEFT JOIN configuracion.funcionalidades f ON (ca.idfuncionalidades = f.idfuncionalidades)
                        LEFT JOIN configuracion.modulos m ON (f.idmodulo = m.idmodulo)
                        LEFT JOIN seguridad.roles_funct rf ON (f.idfuncionalidades = rf.idfuncionalidades)
                        WHERE rf.idroles IN ($idroles) OR ca.idmodulo = 0";

        $ORDER_BY = " ORDER BY m.indice, m.nombre, f.indice, f.nombre";
        $RESULT = $SQL . $ORDER_BY;
        $result = $cc->fetchAll($RESULT);

        if (count($result)) {
            foreach ($result as &$v) {
                if ($v['idmodulo'] == 0 || $v['idmodulo'] == null) {
                    $v['nombre'] = 'Portal';
                    $v['modulo'] = 'Portal';
                    $v['idmodulo'] = 0;
                    $v['modindice'] = 0;
                    $v['idfuncionalidades'] = 0;
                    $v['descripcion'] = 'Ayuda de la funcionalidad Portal';
                }
            }
        }

        return array('campos' => $result, 'totalrecords' => count($result));
    }

}
