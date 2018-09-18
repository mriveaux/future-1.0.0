<?php

class EngineController extends ControllerSecure {

    private $engineModel;
    private $notificacion;
    private $recomendacionModel;
    private $noConformidadModel;

    public function __construct() {
        parent::__construct();
        $this->_integrator->setModels('seguridad', 'Usuarios');
        $this->_integrator->setModels('seguridad', 'Roles');
        $this->_integrator->setModels('seguridad', 'Gruporoles');
        $this->_integrator->setModels('capitalhumano', 'Trabajadores');
        $this->_integrator->setModels('configuracion', 'Funcionalidades');
        $this->_integrator->setModels('configuracion', 'Modulos');
        $this->_integrator->setModels('soporte', 'Recomendacion');
        $this->_integrator->setModels('soporte', 'NoConformidad');
        $this->_integrator->setModels('soporte', 'Notificacion');

        $this->engineModel = new EngineModel();
        $this->recomendacionModel = new RecomendacionModel();
        $this->noConformidadModel = new NoconformidadModel();
        $this->notificacion = new Notificacion();
    }

    public function engineAction() {
        $this->render('engine');
    }

    public function aparienciaAction() {
        $this->render('apariencia');
    }

    public function legalAction() {
        $this->render('legal');
    }

    public function loadAccordionMenuAction() {
        try {
            echo json_encode(Funcionalidades::getModulos($this->dataSession->arridroles));
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    public function loadfunctionalitiesAction() {
        $idNode = is_numeric($this->dataPost->node) ? $this->dataPost->node : 0;
        echo json_encode(Funcionalidades::getFuncionalidadesRol($this->dataPost->idmodulo, $idNode));
    }

    public function loadaparienceconfigAction() {
        echo json_encode($this->engineModel->loadAparienceConfig());
    }

    public function loadlegaldataAction() {
        echo json_encode($this->engineModel->loadLegalData());
    }

    public function loaddatauserAction() {
        try {
            echo json_encode($this->engineModel->loadDataUser($this->dataPost), JSON_FORCE_OBJECT);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function changepasswdAction() {
        echo json_encode($this->engineModel->changePasswdUser($this->dataPost));
    }

    public function closesessionAction() {
        Future_Session::getInstance()->destroy();
    }

    public function registernonconformityAction() {
        echo json_encode($this->noConformidadModel->addNoConformidad($this->dataPost));
    }

    public function registerrecomendationAction() {
        echo json_encode($this->recomendacionModel->addRecomendation($this->dataPost));
    }

    public function updatenotificationsAction() {
        $dataNotifications = $this->notificacion->updateNotifications($this->dataPost, $this->dataSession);
        echo json_encode($dataNotifications);
    }

    public function setaparienceconfigAction() {
        $exec = $this->engineModel->setAparienceConfig($this->dataPost);
        echo json_encode(array("success" => $exec, "workspace" => $this->dataSession->espaciotrabajo));
    }

}
