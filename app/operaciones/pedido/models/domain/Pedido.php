<?php

class Pedido extends Doctrine_Record {

    public function __construct($table = null, $isNewEntry = false) {
        parent::__construct($table, $isNewEntry);
    }

    public function setUp() {
        parent::setUp();
//        $this->hasOne('Cliente', array('local' => 'idcliente', 'foreign' => 'idcliente'));
        $this->hasOne('Producto', array('local' => 'idproducto', 'foreign' => 'idproducto'));
        $this->hasOne('Productodemandado', array('local' => 'idpedido', 'foreign' => 'idpedido'));
        $this->hasOne('Entidades', array('local' => 'identidades', 'foreign' => 'identidad'));
    }

    public function setTableDefinition() {
        $this->setTableName('operaciones.pedido');
        $this->hasColumn('idpedido', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'operaciones.pedido_idpedido'));
        $this->hasColumn('cantidad', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechapedido', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('anno', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estado', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idproducto', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidades', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('ene', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('feb', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('mar', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abr', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('may', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('jun', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('jul', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('ago', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('sep', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('oct', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nov', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('dic', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('motivo', 'character varying', 255, array('notnull' => true, 'primary' => false));
    }

    //funcion para listar los pedidos
    public function cargarPedido($post) {
        try {
            $start = $post->start;
            $limit = $post->limit;
            if (isset($post->cadena))
                $cadena = $post->cadena;
            $idcategoria = $post->idcategoria;
            $identidad = $_SESSION['identidad'];
            $desde = "1/1/" . date("Y");
            $hasta = "31/12/" . date("Y");
            $query = Doctrine_Query::create();
            $query->select('p.*,(p.cantidad * prod.precio) as valor, prod.*, u.*')
                    ->from('Pedido p')
                    ->innerJoin('p.Producto prod')
                    ->innerJoin('prod.Unidadmedida u')
                    ->where("p.identidades = $identidad AND p.fechapedido BETWEEN '$desde' AND '$hasta' AND prod.idcategoria = $idcategoria")
                    ->offset($start)
                    ->limit($limit)
                    ->orderby('p.anno DESC, prod.codigo, prod.nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
            $queryCount = Doctrine_Query::create();
            $queryCount->select('p.*,prod.idproducto')
                    ->from('Pedido p')
                    ->innerJoin('p.Producto prod')
                    ->where("p.identidades = $identidad AND p.fechapedido BETWEEN '$desde' AND '$hasta' AND prod.idcategoria = $idcategoria")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
            if (isset($cadena) && strlen($cadena) > 0) {
                $query->addWhere("prod.codigo ILIKE '%" . $cadena . "%' OR prod.nombre ILIKE '%" . $cadena . "%'");
                $queryCount->addWhere("prod.codigo ILIKE '%" . $cadena . "%' OR prod.nombre ILIKE '%" . $cadena . "%'");
            }
            $total = $this->getTotalValue($idcategoria, $identidad, $desde, $hasta);
            return array('campos' => $query->execute(), 'totalrecords' => count($queryCount->execute()), 'total' => $total);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getTotalValue($idcategoria, $identidad, $desde, $hasta) {
        $queryCount = Doctrine_Query::create();
        $result = $queryCount->select('SUM(p.cantidad * prod.precio) as valor')
                ->from('Pedido p')
                ->innerJoin('p.Producto prod')
                ->where("p.identidades = $identidad AND p.fechapedido BETWEEN '$desde' AND '$hasta' AND prod.idcategoria = $idcategoria")
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return (count($result)) ? $result[0]['valor'] : 0;
    }

    function buscarPedidoporNombreProducto($argIdproducto, $argAnno, $idPedido = null) {
        $identidad = $_SESSION['identidad'];
        if (!$idPedido) {
            $query = Doctrine_Query::create();
            $result = $query->select("p.*")
                    ->from("Pedido p")
                    ->where("p.idpedido = $argIdproducto AND p.anno = $argAnno AND p.identidades = $identidad")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            (count($result)) ? true : false;
        } else {//caso del modificar
            $query = Doctrine_Query::create();
            $result = $query->select("p.*")
                    ->from("Pedido p")
                    ->where("p.idpedido = $argIdproducto AND p.anno = $argAnno AND p.idpedido <> $idPedido  AND p.identidades = $identidad")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            (count($result)) ? true : false;
        }
    }

    function cargarClientes() {
        $query = Doctrine_Query::create();
        $result = $query->select('c.*')
                ->from('Cliente c')
                ->where('c.estado = 1')
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        return $result;
    }

}
