<?php

class CategoriaclienteController extends ControllerSecure {

    private $categoriacliente;
    private $categoriaclienteModel;
    private $sector;
    private $tiposervicio;

    public function __construct() {
        parent::__construct();
        $this->categoriacliente = new Categoriacliente();
        $this->categoriaclienteModel = new CategoriaclienteModel();
        $this->_integrator->setModels('maestros', 'NomSector');
        $this->_integrator->setModels('maestros', 'NomTiposervicio');
        $this->sector = new Sector();
        $this->tiposervicio = new Tiposervicio();
    }

    public function categoriaclienteAction() {
        $this->render('categoriacliente');
    }

    public function loaddatacategoriaclienteAction() {
        echo json_encode($this->categoriacliente->loadDataCategoriaclientes($this->dataPost));
    }

    public function loaddatasectorAction() {
        echo json_encode($this->sector->loadDataSectorService($this->dataPost));
    }

    public function loaddatatiposervicioAction() {
        echo json_encode($this->tiposervicio->loadDataTiposervicioService($this->dataPost));
    }

    public function addcategoriaclienteAction() {
        echo json_encode($this->categoriaclienteModel->addCategoriacliente($this->dataRest));
    }

    public function modcategoriaclienteAction() {
        echo json_encode($this->categoriaclienteModel->modCategoriacliente($this->dataRest));
    }

    public function delcategoriaclienteAction() {
        echo json_encode($this->categoriaclienteModel->delCategoriacliente($this->dataRest));
    }

}