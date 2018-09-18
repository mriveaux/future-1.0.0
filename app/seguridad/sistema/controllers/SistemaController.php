<?php

class SistemaController extends ControllerSecure {

    private $sistemaModel;

    public function __construct() {
        parent::__construct();
        $this->sistemaModel = new SistemaModel();
    }

    public function sistemaAction() {
        $this->render('sistema');
    }

    public function loadconfigsystemAction() {
        echo(json_encode($this->sistemaModel->loadConfigSystem()));
    }

    public function loadtechcompositionAction() {
        echo json_encode($this->sistemaModel->loadTechComposition());
    }

    public function saveconfigenvironmentAction() {
        echo(json_encode($this->sistemaModel->saveConfigEnvironment($this->dataPost)));
    }

    public function saveconfigblockadeAction() {
        echo(json_encode($this->sistemaModel->saveConfigBlockade($this->dataPost)));
    }

    public function saveconfigldapAction() {
        echo(json_encode($this->sistemaModel->saveConfigLdap($this->dataPost)));
    }

    public function testconfigldapAction() {
        echo(json_encode($this->sistemaModel->testConfigLdap($this->dataPost)));
    }

    public function savesmtpconfigAction() {
        echo(json_encode($this->sistemaModel->saveSmtpConfig($this->dataPost)));
    }

    public function testsmtpconfigAction() {
        echo(json_encode($this->sistemaModel->testSmtpConfig($this->dataPost)));
    }

}
