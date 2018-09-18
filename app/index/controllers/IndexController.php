<?php

class IndexController extends ControllerSecure {

    private $indexModel;

    public function __construct() {
        parent::__construct(FALSE);
        $this->_integrator->setModels('seguridad', 'Roles');
        $this->_integrator->setModels('seguridad', 'Gruporoles');
        $this->_integrator->setModels('seguridad', 'Bloqueousuario');
        $this->_integrator->setModels('seguridad', 'Usuarios');
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->_integrator->setModels('capitalhumano', 'Trabajadores');
        $this->indexModel = new IndexModel();
    }

    public function indexAction() {
        $this->render('index');
    }

    public function expiredAction() {
        $this->render('expired');
    }

    public function reindexAction() {
        $this->render('reindex');
    }

    public function futureauthservice_loggin_Action() {
        echo json_encode($this->indexModel->futureAuthUser($this->dataPost, $this->dataSession->authToken));
    }

    public function futureauthgobackAction() {
        echo json_encode($this->indexModel->goBack());
    }

    public function futureauthloadentitiesAction() {
        echo json_encode($this->indexModel->loadEntities());
    }

    public function futureauthsetentityAction() {
        $exec = $this->indexModel->setEntityData($this->dataPost);
        echo json_encode(array("success" => $exec, "workspace" => $this->workspace));
    }

}
