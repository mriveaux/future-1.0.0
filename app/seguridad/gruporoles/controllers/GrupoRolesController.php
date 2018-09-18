<?php

class GrupoRolesController extends ControllerSecure {

    private $gruporoles;
    private $gruporolesModel;

    public function __construct() {
        parent::__construct();
        $this->gruporoles = new GrupoRoles();
        $this->gruporolesModel = new GrupoRolesModel();
        $this->_integrator->setModels('seguridad', 'Roles');
    }

    public function gruporolesAction() {
        $this->render('gruporoles');
    }

    public function loaddatagruporolesAction() {
        echo json_encode($this->gruporoles->loadDataGrupoRoles($this->dataRest));
    }

    public function loaddatarolesAction() {
        echo json_encode($this->gruporolesModel->loadDataRoles($this->dataPost));
    }

    public function addgruporolesAction() {
        echo json_encode($this->gruporolesModel->addGrupoRoles($this->dataRest));
    }

    public function modgruporolesAction() {
        echo json_encode($this->gruporolesModel->modGrupoRoles($this->dataRest));
    }

    public function delgruporolesAction() {
        echo json_encode($this->gruporolesModel->delGrupoRoles($this->dataRest));
    }

    public function saverolesassociationAction() {
        echo json_encode($this->gruporolesModel->saveRolesAssociation($this->dataPost));
    }

}
