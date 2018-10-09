<?php

class DemandaController extends ControllerSecure {

    private $Demanda;
    private $DemandaModel;

    public function __construct() {
        parent::__construct();
        $this->Demanda = new Demanda();
        $this->DemandaModel = new DemandaModel();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('operaciones', 'Pedido');
        $this->_integrator->setModels('maestros', 'NomProducto');
        $this->_integrator->setModels('maestros', 'NomUnidadmedida');
        $this->_integrator->setModels('estructuraorg', 'Entidades');
    }

    public function demandaAction() {
        $this->render('demanda');
    }

    //funcion para listar los demanda
    public function cargardemandaAction() {
        echo json_encode($this->Demanda->cargarDemanda($this->dataPost));
    }

    //funcion para listar los pedidos
    public function listarpedidosAction() {
        echo json_encode($this->Demanda->getAllPedidos($this->dataPost->anno, $this->dataPost->cadena));
    }

//funcion para listar los pedidos del modificar
    public function listarpedidosmodAction() {
        echo json_encode($this->DemandaModel->getAllPedidosToModify($this->dataPost->iddemanda, $this->dataPost->anno, $this->dataPost->cadena));
    }

    public function listardetailpedidosAction() {
        echo json_encode($this->DemandaModel->getAllPedidosDemanda($this->dataPost->iddemanda, $this->dataPost->cadena));
    }

    //funcion para adicionar demanda
    public function adicionardemandaAction() {
        echo json_encode($this->DemandaModel->Adicionar($this->dataPost));
    }

    //funcion para modificar demanda
    public function modificardemandaAction() {
        echo json_encode($this->DemandaModel->Modificar($this->dataPost));
    }

    //funcion para eliminar demanda
    public function eliminardemandaAction() {
        echo json_encode($this->DemandaModel->Eliminar($this->dataPost->iddemanda, json_decode($this->dataPost->arridpedidos)));
    }

    //funcion para eliminar demanda
    public function aprobardemandaAction() {
        echo json_encode($this->DemandaModel->Aprobar($this->dataPost->iddemanda));
    }

    //funcion para verificar si se puede adicionar la demanda
    public function verificaradicionardemandaAction() {
        echo json_encode($this->DemandaModel->verificarAddDemanda());
    }

    //funcion para verificar si se puede adicionar la demanda
    public function verificareliminardemandaAction() {
        echo json_encode($this->DemandaModel->verificarDelDemanda());
    }

    //funcion para verificar si se puede aprobar la demanda
    public function verificaraprobardemandaAction() {
        echo json_encode($this->DemandaModel->verificarAprobDemanda($this->dataPost));
    }

    public function loadDataPreviewAction() {
        echo json_encode($this->DemandaModel->loadDataPreview($this->dataPost));
    }

}
