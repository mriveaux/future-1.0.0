<?php

class Demanda extends Doctrine_Record {

    public function __construct($table = null, $isNewEntry = false) {
        parent::__construct($table, $isNewEntry);
    }

    public function setUp() {
        parent::setUp();
        $this->hasMany('Productodemandado', array('local' => 'iddemanda', 'foreign' => 'iddemanda'));
    }

    public function setTableDefinition() {
        $this->setTableName('operaciones.demanda');
        $this->hasColumn('iddemanda', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'operaciones.demanda_iddemanda'));
        $this->hasColumn('anno', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estado', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidades', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function cargarDemanda($argRequest = NULL) {
        try {
            $identidad = $_SESSION['identidad'];
            $start = (isset($argRequest->start)) ? $argRequest->start : 0;
            $limit = (isset($argRequest->limit)) ? $argRequest->limit : 0;
            $query = Doctrine_Query::create();
//            $result = $query->select('d.*, pd.*')
            $result = $query->select('d.*')
                    ->from('Demanda d')
                    //->innerJoin('d.Productodemandado pd')
                    ->where("d.identidades = $identidad")
                    ->orderby('anno DESC')
                    ->offset($start)
                    ->limit($limit)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();

            $query2 = Doctrine_Query::create();
            $result2 = $query2->select('*')
                    ->from('Demanda d')
                    ->where("d.identidades = $identidad")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();

            return array('campos' => $result, 'totalrecords' => count($result2));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAllPedidos($anno, $cadena = null) {
        $query = Doctrine_Query::create();
        $query->select('p.*, prod.*, u.*, e.nombre as entidad')
                ->from('Pedido p')
                ->innerJoin('p.Producto prod')
                ->innerJoin('prod.Unidadmedida u')
                ->innerJoin('p.Entidades e')
                ->where("p.anno = $anno AND p.estado = 0")
                ->orderby('p.anno DESC, prod.codigo, prod.nombre')
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        if (isset($cadena) && strlen($cadena) > 0) {
            $query->addWhere("prod.codigo ILIKE '%" . $cadena . "%' OR prod.nombre ILIKE '%" . $cadena . "%'");
        }
        $result = $query->execute();
        return array('campos' => (count($result)) ? $result : array());
    }

    public function getAllPedidosMod($argAnno, $arrIdPedidosDemandados, $cadena) {
        $str_idpedidosdemandados = implode(',', $arrIdPedidosDemandados);
        $where = "p.anno = $argAnno AND (p.estado = 0 OR p.idpedido IN ($str_idpedidosdemandados))";

        $query = Doctrine_Query::create();
        $query->select('p.*, prod.*, u.*, e.nombre as entidad')
                ->from('Pedido p')
                ->innerJoin('p.Producto prod')
                ->innerJoin('prod.Unidadmedida u')
                ->innerJoin('p.Entidades e')
                ->where($where)
                ->orderby('p.anno DESC, prod.codigo, prod.nombre')
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        if (isset($cadena) && strlen($cadena) > 0) {
            $query->addWhere("prod.codigo ILIKE '%" . $cadena . "%' OR prod.nombre ILIKE '%" . $cadena . "%'");
        }
        return $query->execute();
    }

    public function buscarDemandaporAnno($anno) {
        $query = Doctrine_Query::create();
        $result = $query->select('d.*')
                ->from('Demanda d')
                ->where("d.anno = $anno")
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return (count($result) > 0) ? true : false;
    }

    public function buscarDatosDemandaporAnno($anno) {
        $query = Doctrine_Query::create();
        return $query->select('d.*')
                        ->from('Demanda d')
                        ->where("d.anno = $anno")
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
    }

    public function buscarDemandaporEstado($argEstado) {
        $query = Doctrine_Query::create();
        return $query->select('d.*')
                        ->from('Demanda d')
                        ->where("d.estado = $argEstado")
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
    }

    public function getLastDemanda() {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        $sql = "SELECT max(d.anno) as anno from operaciones.demanda d;";
        return $cc->fetchAll($sql);
    }

    /**
     * Obtener los datos de la demanda aprobada o el plan de producci&oacute;n actual.
     * @return array
     */
    public function getDemandaAprobada() {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $sql = "SELECT * from operaciones.demanda WHERE estado = 2;";
            $result = $cc->fetchAll($sql);
            return count($result) > 0 ? $result[0] : array();
        } catch (Doctrine_Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

}
