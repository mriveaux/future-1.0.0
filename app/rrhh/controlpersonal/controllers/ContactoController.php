<?php

class ContactoController extends ControllerSecure {

    private $contacto;
    private $contactoModel;

    public function __construct() {
        parent::__construct();
        $this->contacto = new Contacto();
        $this->contactoModel = new ContactoModel();
    }

    public function getcontactoAction() {
        echo $this->dataResponse->toJson($this->contacto->getContacto($this->dataPost));
    }

    public function addcontactoAction() {
        echo $this->dataResponse->toJson($this->contactoModel->addContacto($this->dataRest));
    }

    public function modcontactoAction() {
        echo $this->dataResponse->toJson($this->contactoModel->modContacto($this->dataRest));
    }

    public function delcontactoAction() {
        echo $this->dataResponse->toJson($this->contactoModel->delContacto($this->dataRest));
    }

}
