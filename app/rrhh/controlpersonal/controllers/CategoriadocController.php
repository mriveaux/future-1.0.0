<?php

class CategoriadocController extends ControllerSecure {

    private $categoriadoc;
    private $categoriadocModel;

    public function __construct() {
        parent::__construct();
        $this->categoriadoc = new Categoriadoc();
        $this->categoriadocModel = new CategoriadocModel();
    }

//    public function categoriadocAction() {
//        $this->render('categoriadoc');
//    }

    public function getcategoriadocsAction() {
        echo $this->dataResponse->toJson($this->categoriadoc->getCategoriadocs($this->dataPost));
    }

    public function addcategoriadocAction() {
        echo $this->dataResponse->toJson($this->categoriadocModel->addCategoriadoc($this->dataRest));
    }

    public function modcategoriadocAction() {
        echo $this->dataResponse->toJson($this->categoriadocModel->modCategoriadoc($this->dataRest));
    }

    public function delcategoriadocAction() {
        echo $this->dataResponse->toJson($this->categoriadocModel->delCategoriadoc($this->dataRest));
    }

}
