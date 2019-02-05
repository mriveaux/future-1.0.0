<?php

class DirectaController extends ControllerSecure {

    private $directa;
    private $directaModel;

    public function __construct() {
        parent::__construct();
        $this->directa = new Directa();
        $this->directaModel = new DirectaModel();
        $this->_integrator->setModels('seguridad', 'Usuarios');
        $this->_integrator->setModels('maestros', 'NomPais');
        $this->_integrator->setModels('capitalhumano', 'Controlpersonal');
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->_integrator->setModels('estructuraorg', 'Plantilla');
        $this->Areaentidad = new Areaentidad();
    }

    public function directaAction() {
        $this->render('directa');
    }

    public function getpersonasAction() {
        echo json_encode($this->directa->getPersonas($this->dataPost, $this->dataSession->identidad));
    }

    public function getseleccionesAction() {
        echo json_encode($this->directa->getListSelecciones($this->dataPost, $this->dataSession->identidad));
    }

    public function getcargoplantillaAction() {
        echo json_encode($this->directa->getCargoPlantilla());
    }

    public function savedirectaAction() {
        echo json_encode($this->directaModel->addDirecta($this->dataPost, $this->dataSession->datiduser, $this->dataSession->identidad));
    }

    function cargarareaentidadAction() {
        echo json_encode($this->Areaentidad->cargarAreaEntidad($this->dataRest));
    }

}