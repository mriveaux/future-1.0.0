<?php

class EntidadesController extends ControllerSecure {

    private $Areaentidad;
    private $EntidadesModel;

    public function __construct() {
        parent::__construct();
        $this->Entidades = new Entidades();
        $this->Areaentidad = new Areaentidad();
        $this->EntidadesModel = new EntidadesModel();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('seguridad', 'Usuarios');
        $this->_integrator->setModels('maestros', 'Dpa');
    }

    public function entidadesAction() {
        $this->render('entidades');
    }

    function cargarentidadesAction() {
        echo json_encode($this->Entidades->cargarEntidades($this->dataRest));
    }

    function cargarareaentidadAction() {
        echo json_encode($this->Areaentidad->cargarAreaEntidad($this->dataRest));
    }

    function loaddatadpaAction() {
        echo json_encode($this->EntidadesModel->loadDataDpa($this->dataRest));
    }

    public function saveentidadAction() {
        echo json_encode($this->EntidadesModel->saveEntidad($this->dataPost));
    }

    function eliminarentidadAction() {
        echo json_encode($this->EntidadesModel->Eliminar($this->dataPost->idnodo));
    }

    function saveareaentidadAction() {
        echo json_encode($this->EntidadesModel->saveArea($this->dataPost));
    }

    function eliminarareaentidadAction() {
        echo json_encode($this->EntidadesModel->EliminarArea($this->dataPost->idnodo));
    }

    function getprovinciasAction() {
        echo json_encode(Entidades::getProvincias());
    }

}