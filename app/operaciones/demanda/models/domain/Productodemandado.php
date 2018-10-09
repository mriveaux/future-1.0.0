<?php

class Productodemandado extends Doctrine_Record {

    public function __construct($table = null, $isNewEntry = false) {
        parent::__construct($table, $isNewEntry);
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Demanda', array('local' => 'iddemanda', 'foreign' => 'iddemanda'));
        $this->hasOne('Pedido', array('local' => 'idpedido', 'foreign' => 'idpedido'));
    }

    public function setTableDefinition() {
        $this->setTableName('operaciones.productodemandado');
        $this->hasColumn('idproductodemandado', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'operaciones.productodemandado_idproductodemandado'));
        $this->hasColumn('cantidad', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpedido', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('iddemanda', 'numeric', null, array('notnull' => false, 'primary' => false));
//        $this->hasColumn('idcliente', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function getProductosDemandados($agIdDemanda) {
        $query = Doctrine_Query::create();
        $result = $query->select('pd.*')
                ->from('Productodemandado pd')
                ->where("pd.iddemanda = $agIdDemanda")
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return $result;
    }

    public function getIdProductosDemandadosByIdPedido($arrIdPedidos) {
        $str_idpedidos = implode(',', $arrIdPedidos);
        $where = "pd.idpedido IN ($str_idpedidos)";
        $query = Doctrine_Query::create();
        $result = $query->select('pd.*')
                ->from('Productodemandado pd')
                ->where($where)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        $arrIdProdDemandados = array();
        foreach ($result as $v) {
            $arrIdProdDemandados[] = $v['idproductodemandado'];
        }
        return $arrIdProdDemandados;
    }

    public function getMetrallaData($agCodigo) {
        try {
            $query = Doctrine_Query::create();
            return $query->select('prod.*, u.*')
                            ->from('Producto prod')
                            ->innerJoin('prod.Unidadmedida u')
                            ->where("prod.codigo = '$agCodigo'")
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    public function getMetrallaRecursosData($agIddemanda) {
        try {
            $query = Doctrine_Query::create();
            return $query->select('prod.*, u.*,p.*')
                            ->from('Producto prod')
                            ->innerJoin('prod.Unidadmedida u')
                            ->innerJoin('prod.Pedido p')
                            ->innerJoin('p.Productodemandado pd')
                            ->where("pd.iddemanda = '$agIddemanda'")
                            ->orderBy("prod.nombre,prod.codigo")
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();

//            $sql = "SELECT prod.*, u.*,p.* as pedido "
//                    . "FROM maestros.nom_producto prod "
//                    . "INNER JOIN maestros.nom_unidadmedida u ON(prod.idunidadmedida = u.idunidadmedida)"
//                    . "INNER JOIN operaciones.pedido p ON(prod.idproducto = p.idproducto)"
//                    . "INNER JOIN operaciones.productodemandado pd ON(p.idpedido = pd.idpedido)"
//                    . "WHERE pd.iddemanda = '$agIddemanda'"
//                    . "ORDER BY prod.nombre, prod.codigo";
//            return Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getDetailProductosDemandadosTest($agIdDemanda, $agAnno, $agIdentidad) {
        try {
            $sql = "SELECT DISTINCT prod.codigo, (SELECT sum(myp.cantidad) as cantidad
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.ene) as ene
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.feb) as feb
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.mar) as mar
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.abr) as abr
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.may) as may
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.jun) as jun
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.jul) as jul
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.ago) as ago
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.sep) as sep
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.oct) as oct
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.nov) as nov
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT sum(myp.dic) as dic
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades IN ($agIdentidad)),
                              (SELECT max(myprod.cuenta) as cuenta
                              FROM maestros.nom_producto myprod
                              where myprod.codigo = prod.codigo)
                    FROM operaciones.productodemandado pd
                    INNER JOIN operaciones.pedido p on (pd.idpedido = p.idpedido)
                    INNER JOIN maestros.nom_producto prod on (p.idproducto = prod.idproducto)
                    INNER JOIN maestros.nom_unidadmedida u on (prod.idunidadmedida = u.idunidadmedida)
                    WHERE pd.iddemanda = $agIdDemanda
                    ORDER BY cuenta, prod.codigo";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            return $result;
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    public function getDetailProductosDemandadosDesagregate($agIdDemanda, $agAnno, $agIdentidad) {
        try {
            $sql = "SELECT DISTINCT prod.codigo, (SELECT sum(myp.cantidad) as cantidad
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.ene) as ene
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.feb) as feb
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.mar) as mar
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.abr) as abr
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.may) as may
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.jun) as jun
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.jul) as jul
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.ago) as ago
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.sep) as sep
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.oct) as oct
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.nov) as nov
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT sum(myp.dic) as dic
                              FROM operaciones.pedido myp
                              INNER JOIN maestros.nom_producto myprod on (myp.idproducto = myprod.idproducto)
                              where myprod.codigo = prod.codigo AND myp.anno = $agAnno AND myp.identidades = $agIdentidad),
                              (SELECT max(myprod.cuenta) as cuenta
                              FROM maestros.nom_producto myprod
                              where myprod.codigo = prod.codigo)
                    FROM operaciones.productodemandado pd
                    INNER JOIN operaciones.pedido p on (pd.idpedido = p.idpedido)
                    INNER JOIN maestros.nom_producto prod on (p.idproducto = prod.idproducto)
                    INNER JOIN maestros.nom_unidadmedida u on (prod.idunidadmedida = u.idunidadmedida)
                    WHERE pd.iddemanda = $agIdDemanda AND p.identidades = $agIdentidad
                    ORDER BY cuenta, prod.codigo";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            return $result;
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    public function getDetailProductosDemandados($agIdDemanda, $cadena = null) {
        $query = Doctrine_Query::create();
        $query->select('pd.*, p.*, prod.*, u.*, e.nombre as entidad, e.orden as orden')
                ->from('Productodemandado pd')
                ->innerJoin('pd.Pedido p')
                ->innerJoin('p.Producto prod')
                ->innerJoin('p.Entidades e')
                ->innerJoin('prod.Unidadmedida u')
                ->where("pd.iddemanda = $agIdDemanda")
                ->orderBy("e.orden, e.nombre, prod.codigo, prod.nombre")
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

        if (isset($cadena) && strlen($cadena) > 0) {
            $query->addWhere("prod.codigo ILIKE '%" . $cadena . "%' OR prod.nombre ILIKE '%" . $cadena . "%'");
        }
        return $query->execute();
    }

}
