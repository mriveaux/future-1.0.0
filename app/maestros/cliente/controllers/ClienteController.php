<?php

class ClienteController extends ControllerSecure {

    public $objCliente;
    public $objClienteModel;

    public function __construct() {
        parent::__construct();
        $this->objCliente = new Cliente();
        $this->objClienteModel = new ClienteModel();
        $this->_integrator->setModels('maestros', 'NomOrganismo');
    }

    public function clienteAction() {
        $this->render('cliente');
    }

    public function cargarclienteAction() {
        echo json_encode($this->objCliente->getClientes($this->dataPost));
    }

    public function addclienteAction() {
        echo json_encode($this->objClienteModel->addCliente($this->dataPost));
    }

    public function modclienteAction() {
        echo json_encode($this->objClienteModel->modCliente($this->dataPost));
    }

    public function delclienteAction() {
        echo json_encode($this->objClienteModel->delCliente($this->dataPost->idcliente));
    }

    public function getdatapreviewAction() {
        echo json_encode($this->objClienteModel->loadDataPreview());
    }

    public function cargarcontactosAction() {
        echo json_encode($this->objCliente->cargarContactos($this->dataPost->idcliente));
    }

    public function delcontactoAction() {
        echo json_encode($this->objClienteModel->delContacto($this->dataPost->idcontactocliente));
    }
    
    public function getorganismosAction() {
        echo json_encode($this->objCliente->loadOrganismos());
    }

}
