<?php

class BancoController extends ControllerSecure {

    private $banco;
    private $bancoModel;
    private $sucursal;
    private $sucursalModel;

    public function __construct() {
        parent::__construct();
        $this->banco = new Banco();
        $this->bancoModel = new BancoModel();
        $this->sucursal = new Sucursal();
        $this->sucursalModel = new SucursalModel();
    }

    public function bancoAction() {
        $this->render('banco');
    }

    public function getbancosAction() {
        echo json_encode($this->banco->getBancos($this->dataPost));
    }

    public function addbancoAction() {
        echo json_encode($this->bancoModel->addBanco($this->dataRest));
    }

    public function modbancoAction() {
        echo json_encode($this->bancoModel->modBanco($this->dataRest));
    }

    public function delbancoAction() {
        echo json_encode($this->bancoModel->delBanco($this->dataRest));
    }

    public function getsucursalesAction() {
        echo json_encode($this->sucursal->getSucursales($this->dataPost));
    }

    public function addsucursalAction() {
        echo json_encode($this->sucursalModel->addSucursal($this->dataRest));
    }

    public function modsucursalAction() {
        echo json_encode($this->sucursalModel->modSucursal($this->dataRest));
    }

    public function delsucursalAction() {
        echo json_encode($this->sucursalModel->delSucursal($this->dataRest));
    }

}
