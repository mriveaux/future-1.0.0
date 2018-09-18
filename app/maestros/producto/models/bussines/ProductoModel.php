<?php

class ProductoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    private function doObject(&$objet, $data) {
        $objet->codigo = $data->codigo;
        $objet->nombre = $data->nombre;
        $objet->idunidadmedida = $data->idunidadmedida;
        $objet->idcategoria = $data->idcategoria;
        $objet->precio = $data->precio;
        $objet->descripcion = $data->descripcion;
        return $objet;
    }

    public function Adicionar($argRequest) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $producto = new Producto();
            if ($producto->buscarProducto($argRequest) == 0) {
                $cc->beginTransaction();
                $this->doObject($producto, $argRequest);
                $producto->save();
                $cc->commit();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            $cc->rollback();
            return 3;
        }
    }

    public function Modificar($argRequest) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $producto = new Producto();
            if ($producto->buscarProducto($argRequest, $argRequest->idproducto) == 0) {
                $cc->beginTransaction();
                $producto = Doctrine::getTable('Producto')->find($argRequest->idproducto);
                $this->doObject($producto, $argRequest);
                $producto->save();
                $cc->commit();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            $cc->rollback();
            return 3;
        }
    }

    public function Eliminar($argData) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $objProd = Doctrine::getTable('Producto')->find($argData->idproducto);
            $cc->beginTransaction();
            if ($objProd->delete()) {
                $cc->commit();
                return 1;
            } else {
                return 2;
            } //tiene pedidos asociados
        } catch (Doctrine_Exception $e) {
            $cc->rollback();
            if ($e->getCode() == 23503) {
                return 2;
            }
            return 3;
        }
    }

    public function ActivateProducto($argRequest) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $producto = Doctrine::getTable('Producto')->find($argRequest->idproducto);
            $producto->activo = $argRequest->activate;
            $producto->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            $cc->rollback();
            return 3;
        }
    }

    public function cargarUnidadMedida() {
        return Unidadmedida::dameUnidadmedida();
    }

}
