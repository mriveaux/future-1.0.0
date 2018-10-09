<?php

class PlantillaController extends ControllerSecure {

    private $Entidades;
    private $Cargoplantilla;
    private $CargoplantillaModel;

    public function __construct() {
        parent::__construct();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->_integrator->setModels('estructuraorg', 'Maestros');
        $this->Entidades = new Entidades();
        $this->Cargoplantilla = new Cargoplantilla();
        $this->CargoplantillaModel = new CargoplantillaModel();
    }

    public function plantillaAction() {
        $this->render('plantilla');
    }

    function loadTreeEntidadesAction() {
        echo json_encode($this->Entidades->getDataEntidades($this->dataPost));
    }

    function loadcargoplantillaAction() {
        echo json_encode($this->Cargoplantilla->loadDataCargoPlantilla($this->dataPost));
    }

    function loadDataCargoAction() {
        echo json_encode($this->CargoplantillaModel->loadDataCargo($this->dataPost));
    }

    function getsalarioAction() {
        $Escalasalarial = new Escalasalarial();
        echo json_encode($Escalasalarial->getSalarioByEscala($this->dataPost));
    }

    public function adicionarcargoAction() {
        echo json_encode($this->CargoplantillaModel->Adicionar($this->dataPost));
    }

    public function modificarcargoAction() {
        echo json_encode($this->CargoplantillaModel->Modificar($this->dataPost));
    }

    public function deletecargoAction() {
        echo json_encode($this->CargoplantillaModel->Eliminar($this->dataPost->idcargoplantilla));
    }

    public function loadDataPreviewAction() {
        echo json_encode($this->CargoplantillaModel->loadDataPreview($this->dataPost));
    }

}