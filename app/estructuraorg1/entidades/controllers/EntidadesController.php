<?php

class EntidadesController extends ControllerSecure {

    private $Areaentidad;
    private $EntidadesModel;

    public function __construct() {
        parent::__construct();
        $this->Areaentidad = new Areaentidad();
        $this->EntidadesModel = new EntidadesModel();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('seguridad', 'Usuarios');
    }

    public function entidadesAction() {
        $this->render('entidades');
    }

    function cargarentidadesAction() {
        echo json_encode(Entidades::cargarEntidades($this->dataPost));
    }

    function cargarareaentidadAction() {
        echo json_encode($this->Areaentidad->cargarAreaEntidad($this->dataPost));
    }

    //adiciona una entidad al sistema
    function adicionarentidadAction() {
        echo json_encode(EntidadesModel::Adicionar($this->dataPost));
    }

    //modifica una entidad 
    function modificarentidadAction() {
        echo json_encode(EntidadesModel::Modificar($this->dataPost));
    }

    //eliminar una entidad 
    function eliminarentidadAction() {
        echo json_encode(EntidadesModel::Eliminar($this->dataPost->idnodo));
    }
    
    function adicionarareaentidadAction() {
        echo json_encode($this->EntidadesModel->AdicionarArea($this->dataPost));
    }

    function modificarareaentidadAction() {
        echo json_encode($this->EntidadesModel->ModificarArea($this->dataPost));
    }

    function eliminarareaentidadAction() {
        echo json_encode($this->EntidadesModel->EliminarArea($this->dataPost->idnodo));
    }

    function getprovinciasAction() {
        echo json_encode(Entidades::getProvincias());
    }

}