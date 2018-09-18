<?php

class ModulosController extends ControllerSecure {

    private $modulos;
    private $modulosModel;

    public function __construct() {
        parent::__construct();
        $this->modulos = new Modulos();
        $this->modulosModel = new ModulosModel();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('configuracion', 'Funcionalidades'); //funcionalidades
    }

    public function modulosAction() {
        $this->render('modulos');
    }

    public function cargarmodulosAction() {
        echo json_encode($this->modulos->cargarModulos($this->dataPost));
    }

    public function adicionarmoduloAction() {
        echo json_encode($this->modulosModel->Insertar($this->dataPost));
    }

    public function modificarmoduloAction() {
        echo json_encode($this->modulosModel->Modificar($this->dataPost));
    }

    public function eliminarmoduloAction() {
        echo json_encode($this->modulosModel->Eliminar($this->dataPost->idmodulo));
    }

}