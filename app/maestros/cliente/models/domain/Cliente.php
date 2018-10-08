<?php

class Cliente extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasMany('Contactocliente', array('local' => 'idcliente', 'foreign' => 'idcliente'));
        $this->hasOne('Organismo', array('local' => 'idorganismo', 'foreign' => 'idorganismo'));
    }

    public function setTableDefinition() {
        $this->setTableName('comercial.cliente');
        $this->hasColumn('idcliente', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'comercial.cliente_idcliente'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('codigoreeup', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('codigonit', 'character varying', 11, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tipo', 'numeric', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('tipopersona', 'numeric', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('estado', 'numeric', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('direccion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('sitioweb', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('correos', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('telefonos', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idorganismo', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function getClientes($post) {
        $query = Doctrine_Query::create();
        $query->select('c.*, o.idorganismo as idorganismo, o.abreviatura as organismo, cc.*, cc.idcontactocliente as idcontactocliente')
                ->from('Cliente c')
                ->leftJoin('c.Contactocliente cc')
                ->innerJoin('c.Organismo o')
                ->orderby('c.nombre')
                ->offset($post->start)
                ->limit($post->limit)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
        $queryCount = Doctrine_Query::create();
        $queryCount->from('Cliente c')
                ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
        if (isset($post->cadena) && strlen($post->cadena) > 0) {
            $filtroNomb = "c.nombre ILIKE '%$post->cadena%'";
            $filtroAbrev = "c.abreviatura ILIKE '%$post->cadena%'";
            $filtroCod = "c.codigoreeup ILIKE '%$post->cadena%'";
            $filtroNit = "c.codigonit ILIKE '%$post->cadena%'";
            $filtroDir = "c.direccion ILIKE '%$post->cadena%'";
            $filtroSite = "c.sitioweb ILIKE '%$post->cadena%'";
            $filtroDescrip = "c.descripcion ILIKE '%$post->cadena%'";
            $query->addWhere($filtroNomb . ' OR ' . $filtroAbrev . ' OR ' . $filtroCod . ' OR ' . $filtroNit . ' OR ' . $filtroDir . ' OR ' . $filtroSite . ' OR ' . $filtroDescrip);
            $queryCount->addWhere($filtroNomb . ' OR ' . $filtroAbrev . ' OR ' . $filtroCod . ' OR ' . $filtroNit . ' OR ' . $filtroDir . ' OR ' . $filtroSite . ' OR ' . $filtroDescrip);
        }
        $result = $query->execute();
        $count = $queryCount->execute();
        return array('campos' => $result, 'totalrecords' => $count->count());
    }

    //busca el id de un usuario determinado
    public function buscarIdUsuario($user) {
        $whereuser = "u.usuario='$user'";
        $query = Doctrine_Query::create();
        $result = $query->select('u.idusuario')
                ->from('Cliente u')
                ->where($whereuser)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
        return $result[0]['idusuario'];
    }

    public static function buscaClienteExistente($post) {

        $codigoreeup = $post->codigoreeup;
        $codigonit = $post->codigonit;
        $abreviatura = $post->abreviatura;
        $nombre = $post->nombre;
        $query = Doctrine_Query::create();
        $query->select('c.idcliente')
                ->from('Cliente c')
                ->where('c.codigoreeup = ? OR c.codigonit = ? OR c.abreviatura = ? OR c.nombre = ?', array($codigoreeup, $codigonit, $abreviatura, $nombre))
                ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
        if (isset($post->idcliente) && strlen($post->idcliente) > 0) {
            $query->addWhere('c.idcliente != ?', $post->idcliente);
        }
        $result = $query->execute();
        return $result;
    }

    public function getDataClientes() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('c.*, o.abreviatura as organismo')
                    ->from('Cliente c')
                    ->innerJoin('c.Organismo o')
                    ->where("c.estado = 1")
                    ->orderby('o.abreviatura ,c.nombre')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function cargarContactos($idCliente) {
        $query = Doctrine_Query::create();
        $query->select('cc.*')
                ->from('Contactocliente cc')
                ->where("cc.idcliente = ?", $idCliente)
                ->orderby('cc.nombre')
                ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
        $result = $query->execute();
        return array('campos' => $result->toArray(), 'totalrecords' => $result->count());
    }

    public function loadOrganismos() {
        try {
            $sql = "SELECT * FROM maestros.nom_organismo;";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            return array('data' => $result);
        } catch (Doctrine_Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

}
