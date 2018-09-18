<?php

class SalarioController extends ControllerSecure {

    public $Salario;
    public $SalarioModel;

    public function __construct() {
        parent::__construct();
        $this->Salario = new Salario();
        $this->SalarioModel = new SalarioModel();
        //se incluyen los contextos necesarios
        $this->_integrator->setModels('estructuraorg', 'Maestros'); //Maestros
    }

    public function salarioAction() {
        $this->render('salario');
    }

    public function getsalarioAction() {
        echo json_encode($this->Salario->getSalario($this->dataPost));
    }

    public function cargargrupoescalaAction() {
        echo json_encode($this->Salario->getGrupoEscala());
    }

    public function adicionarsalarioAction() {
        echo json_encode($this->SalarioModel->Adicionar($this->dataPost));
    }

    public function modificarsalarioAction() {
        echo json_encode($this->SalarioModel->Modificar($this->dataPost));
    }

    public function deletesalarioAction() {
        echo json_encode($this->SalarioModel->eliminarSalario($this->dataPost->idsalario));
    }

}
