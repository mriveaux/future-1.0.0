<?php

class Producto extends Doctrine_Record {

    public function __construct($table = null, $isNewEntry = false) {
        parent::__construct($table, $isNewEntry);
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Unidadmedida', array('local' => 'idunidadmedida', 'foreign' => 'idunidadmedida'));
        $this->hasMany('Pedido', array('local' => 'idproducto', 'foreign' => 'idproducto'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_producto');
        $this->hasColumn('idproducto', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_producto_idproducto'));
        $this->hasColumn('codigo', 'character varying', 10, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idunidadmedida', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idcategoria', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('precio', 'numeric', 19.2, array('notnull' => true, 'primary' => false));
        $this->hasColumn('cuenta', 'numeric', 4, array('notnull' => true, 'primary' => false));
        $this->hasColumn('activo', 'numeric', 1, array('notnull' => true, 'primary' => false));
    }

    public function loadDataProducto($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('p.*, u.abreviatura as unidadmedida')
                    ->from('Producto p')
                    ->innerJoin('p.Unidadmedida u')
                    ->orderby('p.idcategoria,p.codigo,p.nombre')
                    ->offset($post->start)->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Producto p')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("p.codigo ILIKE '%" . $criterio . "%' OR p.nombre ILIKE '%" . $criterio . "%' OR p.descripcion ILIKE '%" . $criterio . "%'");
                $queryCount->addWhere("p.codigo ILIKE '%" . $criterio . "%' OR p.nombre ILIKE '%" . $criterio . "%' OR p.descripcion ILIKE '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    //busca si existe el producto dado el nombre
    public function buscarProducto($data, $idproducto = 0) {
        $nombre = $data->nombre;
        $codigo = $data->codigo;
        $query = Doctrine_Query::create();
        $query->select('*')
                ->from('Producto p')
                ->where('p.nombre = ? OR p.codigo = ?', array($nombre, $codigo))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        $result = $query->execute();
        if (count($result) > 0) {
            if ($idproducto != 0) {
                return ($result[0]['idproducto'] == $idproducto) ? 0 : 1;
            } // 0-> se puede mod, 1-> no mod
            else {
                return 1;
            }
        } else {
            return 0;
        } // 1-> encontro, 0->no encontro        
    }

    //=================================================================
    static public function dameproducto($argCategoria = array(), $status = array()) {
        try {
            $query = Doctrine_Query::create();
            $query->select('p.*, u.*')
                    ->from('Producto p')
                    ->innerJoin('p.Unidadmedida u')
                    ->orderBy('p.codigo,p.nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
            if (count($argCategoria)) {
                $str_categorias = implode(',', $argCategoria);
                $str_status = implode(',', $status);
                $query->addWhere("p.idcategoria IN ($str_categorias) AND p.activo IN ($str_status)");
            }
            return $query->execute();
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function cargarMateriales() {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $sql = "SELECT p.*, p.idproducto as idmaterial, p.nombre as material, u.abreviatura "
                    . "FROM nomencladores.producto p "
                    . "LEFT JOIN nomencladores.unidadmedida u ON p.idunidadmedida = "
                    . "u.idunidadmedida WHERE p.idcategoria = 2;";
            $result = $cc->fetchAll($sql);
            return array('data' => $result, 'cant' => count($result));
        } catch (Doctrine_Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function cargarRecetas($idProducto) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $sql = "SELECT r.*, p.idunidadmedida, u.abreviatura, p.idproducto, p.nombre as material "
                    . "FROM nomencladores.nom_receta r "
                    . "INNER JOIN nomencladores.producto p ON (p.idproducto = r.idmaterial) "
                    . "LEFT JOIN nomencladores.unidadmedida u ON (p.idunidadmedida = u.idunidadmedida) "
                    . "WHERE r.idproducto = $idProducto ORDER BY p.nombre;";
            $result = $cc->fetchAll($sql);
            return array('data' => $result, 'cant' => count($result));
        } catch (Doctrine_Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

}
