<?php

class Formato extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasMany('Parteformato', array('local' => 'idparteformato', 'foreign' => 'idparteformato'));
        $this->hasMany('FormatoEntidad', array('local' => 'idformatoentidad', 'foreign' => 'idformatoentidad'));
        $this->hasMany('Modulos', array('local' => 'idmodulo', 'foreign' => 'idmodulo'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.dat_formato');
        $this->hasColumn('idformato', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.dat_formato_idformato'));
        $this->hasColumn('formato', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('separador', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estandar', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idmodulo', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

    public function getFormatos($post, $idEntidad) {
        try {

            $start = $post->start;
            $limit = $post->limit;
            $criterio = $post->criterio;
            $where = "";
            if (strlen($criterio) > 0 && isset($post->criterio)) {
                $where .= "f.formato ilike '%" . $criterio . "%'";
            }
            if ($criterio != '') {
                $where .= " AND (fe.identidad = $idEntidad OR f.estandar = 1)";
            } else {
                $where .= "fe.identidad = $idEntidad OR f.estandar = 1";
            }
            $sql = "SELECT DISTINCT f.*, m.nombre as modulo, (CASE WHEN f.identidad = $idEntidad THEN 1 ELSE 0 END) as propietario FROM maestros.dat_formato f  LEFT JOIN maestros.dat_formatoentidad fe ON f.idformato = fe.idformato INNER JOIN configuracion.modulos m ON f.idmodulo = m.idmodulo WHERE $where ORDER BY m.nombre, f.formato ASC LIMIT $limit OFFSET $start;";
            $data = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);

            if (count($data) > 0) {
                $this->getFormatosExtraData($data);
            }

//            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
//            $query->from('Formato n')->offset($post->start)
//                ->limit($post->limit)
//                ->where('identidad = ? OR estandar = 1', $idEntidad)
//                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Formato f')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
//                $query->addWhere("n.formato ilike '%" . $criterio . "%'");
                $queryCount->addWhere("f.formato ilike '%" . $criterio . "%'");
            }
//            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $data, 'total' => count($data));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getModulos() {
        try {
            $sql = "SELECT * FROM configuracion.modulos;";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            return $result;
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function getFormatosExtraData(&$arrayFormats) {
        $parteFormato = new Parteformato();
        foreach ($arrayFormats as &$format) {
            $parts = $parteFormato->getPartesFormato($format['idformato']);
            $estructure = array();
            $preview = array();
            $long = 0;
            foreach ($parts as $part) {
                $estructure[] = $part['abreviatura'];
                $preview[] = $this->replaceCero($part['longitud']);
                $long += $part['longitud'];
            }
            $format['estructura'] = (count($estructure)) ? implode($format['separador'], $estructure) : '';
            $format['vistap'] = (count($preview)) ? implode($format['separador'], $preview) : '';
            $format['longitud'] = $long;
        }
    }

    public function replaceCero($length) {
        $strZeros = "";
        while ($length > 0) {
            $strZeros .= "0";
            $length--;
        }
        return $strZeros;
    }

}
