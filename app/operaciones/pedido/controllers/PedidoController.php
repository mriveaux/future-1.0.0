<?php

class PedidoController extends ControllerSecure {

    private $Pedido;
    private $PedidoModel;

    public function __construct() {
        parent::__construct();
        $this->Pedido = new Pedido();
        $this->PedidoModel = new PedidoModel();
        //se incluyen los contextos necesarios
//        $this->_integrator->setModels('comercial', 'Cliente'); //Cliente		
        $this->_integrator->setModels('operaciones', 'Demanda');
        $this->_integrator->setModels('maestros', 'NomProducto');
        $this->_integrator->setModels('maestros', 'NomUnidadmedida');
        $this->_integrator->setModels('estructuraorg', 'Entidades');
    }

    public function pedidoAction() {
        $this->render('pedido');
    }

    public function cargarpedidoAction() {
        echo json_encode($this->Pedido->cargarPedido($this->dataPost));
    }

    public function cargarclientesAction() {
        echo json_encode($this->Pedido->cargarClientes());
    }

    public function cargarproductosAction() {
        echo json_encode(Producto::dameproducto(array($this->dataPost->idcategoria), array(1)));
    }

    public function adicionarpedidoAction() {
        echo json_encode($this->PedidoModel->Adicionar($this->dataPost));
    }

    public function modificarpedidoAction() {
        echo json_encode($this->PedidoModel->Modificar($this->dataPost));
    }

    public function eliminarpedidoAction() {
        echo json_encode($this->PedidoModel->Eliminar($this->dataPost->idpedido));
    }

}
