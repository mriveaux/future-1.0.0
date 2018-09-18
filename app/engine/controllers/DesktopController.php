<?php

class DesktopController extends ControllerSecure {

    private $desktopModel;
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

        $this->desktopModel = new DesktopModel();
        $this->recomendacionModel = new RecomendacionModel();
        $this->noConformidadModel = new NoconformidadModel();
        $this->notificacion = new Notificacion();
    }

    public function desktopAction() {
        $this->render('desktop');
    }

    public function aparienciaAction() {
        $this->render('apariencia');
    }

    public function legalAction() {
        $this->render('legal');
    }

    public function loaddesktopAction() {
        echo json_encode($this->desktopModel->loadDesktop($this->dataSession->arridroles));
    }

    public function loadaparienceconfigAction() {
        echo json_encode($this->desktopModel->loadAparienceConfig());
    }

    public function loadlegaldataAction() {
        echo json_encode($this->desktopModel->loadLegalData());
    }

    public function loaddatauserAction() {
        try {
            echo json_encode($this->desktopModel->loadDataUser($this->dataPost), JSON_FORCE_OBJECT);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function changepasswdAction() {
        echo json_encode($this->desktopModel->changePasswdUser($this->dataPost));
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
        echo json_encode($this->desktopModel->setAparienceConfig($this->dataPost));
    }

}
