<?php

class EscalasalarialController extends ControllerSecure {

    public $Escalasalarial;
    public $EscalasalarialModel;

    public function __construct() {
        parent::__construct();
        $this->Escalasalarial = new Escalasalarial();
        $this->EscalasalarialModel = new EscalasalarialModel();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('estructuraorg', 'Maestros'); //Maestros
    }

    public function escalasalarialAction() {
        $this->render('escalasalarial');
    }

    public function getescalasalarialAction() {
        echo json_encode($this->Escalasalarial->getEscalasalarial($this->dataPost));
    }

    public function cargartipoescalaAction() {
        echo json_encode($this->Escalasalarial->getTipoEscala());
    }
    public function cargargrupoescalaAction() {
        echo json_encode($this->Escalasalarial->getGrupoEscala());
    }
    public function cargarsalarioAction() {
        echo json_encode($this->Escalasalarial->getSalario($this->dataPost->idgrupoescala));
    }

    public function adicionarescalasalarialAction() {
        echo json_encode($this->EscalasalarialModel->Adicionar($this->dataPost));
    }

    public function modificarescalasalarialAction() {
        echo json_encode($this->EscalasalarialModel->Modificar($this->dataPost));
    }

    public function deleteescalasalarialAction() {
        echo json_encode($this->EscalasalarialModel->eliminarEscalasalarial($this->dataPost->idescalasalarial));
    }

}
