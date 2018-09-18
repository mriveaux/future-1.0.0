<?php

class ColorController extends ControllerSecure {

    private $color;
    private $colorModel;

    public function __construct() {
        parent::__construct();
        $this->color = new Color();
        $this->colorModel = new ColorModel();
    }

    public function colorAction() {
        $this->render('color');
    }

    public function getcolorAction() {
        echo json_encode($this->color->getColors($this->dataPost));
    }

    public function addcolorAction() {
        echo json_encode($this->colorModel->addColor($this->dataPost));
    }

    public function modcolorAction() {
        echo json_encode($this->colorModel->modColor($this->dataPost));
    }

    public function delcolorAction() {
        echo json_encode($this->colorModel->delColor($this->dataPost->idcolor));
    }

}