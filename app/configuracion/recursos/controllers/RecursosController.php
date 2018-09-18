<?php

class RecursosController extends ControllerSecure {

    private $recursos;
    private $acciones;
    private $recursosModel;

    public function __construct() {
        parent::__construct();
        $this->recursos = new Recursos();
        $this->acciones = new Acciones();
        $this->recursosModel = new RecursosModel();
        $this->_integrator->setModels('configuracion', 'Modulos');
        $this->_integrator->setModels('configuracion', 'Funcionalidades');
    }

    public function recursosAction() {
        $this->render('recursos');
    }

    public function loadtreefuncionalidadesAction() {
        echo json_encode($this->recursosModel->loadDataFuncionalidades($this->dataRest));
    }

    public function loaddatarecursosAction() {
        echo json_encode($this->recursos->loadDataRecursos($this->dataRest));
    }

    public function loaddataaccionesAction() {
        echo json_encode($this->acciones->loadDataAcciones($this->dataRest));
    }

    public function addrecursoAction() {
        echo json_encode($this->recursosModel->addRecurso($this->dataRest));
    }

    public function modrecursoAction() {
        echo json_encode($this->recursosModel->modRecurso($this->dataRest));
    }

    public function delrecursoAction() {
        echo json_encode($this->recursosModel->delRecurso($this->dataRest));
    }

    public function saveactionsassociationAction() {
        echo json_encode($this->recursosModel->saveActionsAssociation($this->dataPost));
    }

}
