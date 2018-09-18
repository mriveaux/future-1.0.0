<?php

class FenotipoController extends ControllerSecure {

    private $fenotipo;
    private $colorojos;
    private $colorpiel;
    private $colorpelo;
    private $fenotipoModel;

    public function __construct() {
        parent::__construct();
        $this->fenotipo = new Fenotipo();
        $this->colorojos = new Colorojos();
        $this->colorpiel = new Colorpiel();
        $this->colorpelo = new Colorpelo();
        $this->fenotipoModel = new FenotipoModel();
    }

    public function getfenotipoAction() {
        echo $this->dataResponse->toJson($this->fenotipo->getFenotipo($this->dataPost));
    }

    public function getcolorojosAction() {
        echo $this->dataResponse->toJson($this->colorojos->getColorojos($this->dataPost));
    }

    public function getcolorpielAction() {
        echo $this->dataResponse->toJson($this->colorpiel->getColorpiel($this->dataPost));
    }

    public function getcolorpeloAction() {
        echo $this->dataResponse->toJson($this->colorpelo->getColorpelo($this->dataPost));
    }

    public function savefenotipoAction() {
        echo $this->dataResponse->toJson($this->fenotipoModel->saveFenotipo($this->dataRest));
    }

    public function addfenotipoAction() {
        echo $this->dataResponse->toJson($this->fenotipoModel->addFenotipo($this->dataRest));
    }

    public function modfenotipoAction() {
        echo $this->dataResponse->toJson($this->fenotipoModel->modFenotipo($this->dataRest));
    }

    public function delfenotipoAction() {
        echo $this->dataResponse->toJson($this->fenotipoModel->delFenotipo($this->dataRest));
    }

}
