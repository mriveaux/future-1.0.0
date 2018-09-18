<?php

class Ayuda extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('configuracion.conf_ayuda');
        $this->hasColumn('idconfayuda', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'configuracion.conf_ayuda_idconfayuda'));
        $this->hasColumn('idmodulo', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idfuncionalidades', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('referencia', 'character varying', null, array('notnull' => false, 'primary' => false));
    }

    public function cargarayuda($cadena = '') {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SELECT = "ca.*, f.idfuncionalidades, f.nombre, f.descripcion, m.idmodulo, m.nombre as modulo";
            $SQL = "SELECT $SELECT
                        FROM configuracion.conf_ayuda ca
                        LEFT JOIN configuracion.funcionalidades f ON (ca.idfuncionalidades = f.idfuncionalidades)
                        LEFT JOIN configuracion.modulos m ON (f.idmodulo = m.idmodulo)";

            $WHERE = " WHERE ";
            $ORDER_BY = " ORDER BY m.nombre, f.nombre";

            if ($cadena == '') {
                $RESULT = $SQL . $ORDER_BY;
                $result = $cc->fetchAll($RESULT);
            } else {
                $FILTER_MODULO = " m.nombre ILIKE '%" . $cadena . "%'";
                $FILTER_FUNCIONALIDAD = " OR f.nombre ILIKE '%" . $cadena . "%'";
                $FILTER_DESCRIPCION = " OR f.descripcion ILIKE '%" . $cadena . "%'";
                $RESULT = $SQL . $WHERE . $FILTER_MODULO . $FILTER_FUNCIONALIDAD . $FILTER_DESCRIPCION . $ORDER_BY;
                $result = $cc->fetchAll($RESULT);
            }
            if (count($result)) {
                foreach ($result as &$v) {
                    if ($v['idmodulo'] == 0 || $v['idmodulo'] == null) {
                        $v['nombre'] = 'Portal';
                        $v['modulo'] = 'Portal';
                        $v['idmodulo'] = 0;
                        $v['idfuncionalidades'] = 0;
                        $v['descripcion'] = 'Ayuda de la funcionalidad Portal';
                    }
                }
            }
            return array('campos' => $result, 'totalrecords' => count($result));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataFuncionalidades() {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $dataFunct = $cc->fetchAll("SELECT f.*, m.nombre as modulo, m.abreviatura as modabreviatura, m.indice as modindice
                        FROM configuracion.funcionalidades f
                        INNER JOIN configuracion.modulos m ON (f.idmodulo = m.idmodulo)
                        WHERE f.idfuncionalidades NOT IN (SELECT ca.idfuncionalidades FROM configuracion.conf_ayuda ca)
                        ORDER BY m.indice, m.nombre, f.indice, f.nombre");
            return array('campos' => $dataFunct);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
