<?php

class ContactoController extends ControllerSecure {

    private $contactoModel;

    public function __construct() {
        parent::__construct();
        $this->_integrator->setModels('estructuraorg', 'Entidades'); //Entidades
        $this->contactoModel = new ContactoModel();
    }

    public function contactoAction() {
        $this->render('contacto');
    }

    public function loadContactoEntidadesAction() {
        echo json_encode($this->contactoModel->getContactoEntidades());
    }

}
