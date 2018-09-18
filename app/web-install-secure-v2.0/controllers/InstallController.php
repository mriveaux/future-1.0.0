<?php

class InstallController extends ControllerSecure {

    private $installModel;

    public function __construct() {
        parent::__construct(FALSE);
        $this->installModel = new InstallModel();
    }

    public function installAction() {
        $this->render('install');
    }

    public function testconnectionAction() {
        echo(json_encode($this->installModel->testConnection($this->dataPost)));
    }

    public function saveconnectionAction() {
        echo(json_encode($this->installModel->saveConnection($this->dataPost)));
    }

    public function verifyregisterAction() {
        echo(json_encode($this->installModel->verifyRegister($_POST)));
    }

    public function saveregisterAction() {
        echo(json_encode($this->installModel->saveRegister($_POST)));
    }

}
