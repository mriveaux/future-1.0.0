<?php

class ProductoController extends ControllerSecure {

    private $producto;
    private $productoModel;

    public function __construct() {
        parent::__construct();
        $this->producto = new Producto();
        $this->productoModel = new ProductoModel();
        $this->_integrator->setModels('maestros', 'NomUnidadmedida');
    }

    public function productoAction() {
        $this->render('producto');
    }

    public function loaddataproductoAction() {
        echo json_encode($this->producto->loadDataProducto($this->dataPost));
    }

    public function loaddataunidadmedidaAction() {
        echo json_encode($this->productoModel->cargarUnidadMedida($this->dataPost));
    }

    public function addproductoAction() {
        echo json_encode($this->productoModel->Adicionar($this->dataPost));
    }

    public function modproductoAction() {
        echo json_encode($this->productoModel->Modificar($this->dataPost));
    }

    public function delproductoAction() {
        echo json_encode($this->productoModel->Eliminar($this->dataPost));
    }

    public function activateproductoAction() {
        echo json_encode($this->productoModel->ActivateProducto($this->dataPost));
    }

}
