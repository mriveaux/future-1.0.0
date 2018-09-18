<?php

class BloqueousuarioController extends ControllerSecure {

    private $bloqueo;
    private $bloqueoModel;

    public function __construct() {
        parent::__construct();
        $this->bloqueo = new Bloqueo();
        $this->bloqueoModel = new BloqueoModel();
        $this->_integrator->setModels('seguridad', 'Usuarios');
    }

    public function bloqueousuarioAction() {
        $this->render('bloqueousuario');
    }

    public function getbloqueousuarioAction() {
        echo json_encode($this->bloqueo->getBloqueousuarios($this->dataPost));
    }

    public function gethisbloqueousuarioAction() {
        echo json_encode($this->bloqueo->getHisBloqueousuarios($this->dataPost));
    }

    public function unlockuserAction() {
        echo json_encode($this->bloqueoModel->desbloquearUsuario($this->dataPost));
    }

}
