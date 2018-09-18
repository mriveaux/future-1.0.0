<?php

class EstructuraController extends ControllerSecure {

    public $nom_estructura;
    public $nom_estructuraModel;

    public function __construct() {
        parent::__construct();
        $this->nom_estructura = new Nomestructura();
        $this->nom_estructuraModel = new NomestructuraModel();
    }

    public function estructuraAction() {
        $this->render('estructura');
    }

    public function cargarestructuraAction() {
        echo json_encode($this->nom_estructura->cargarestructura($this->dataPost->start, $this->dataPost->limit, $this->dataPost->cadena));
    }

    public function adicionarestructuraAction() {
        echo json_encode($this->nom_estructuraModel->Adicionar($this->dataPost));
    }

    public function modificarestructuraAction() {
        echo json_encode($this->nom_estructuraModel->Modificar($this->dataPost));
    }

    public function eliminarestructuraAction() {
        echo json_encode($this->nom_estructuraModel->Eliminar($this->dataPost));
    }

}