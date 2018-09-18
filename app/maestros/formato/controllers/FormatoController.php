<?php

class FormatoController extends ControllerSecure {

    private $formato;
    private $formatoModel;
    private $parteFormato;
    private $parteFormatoModel;

    public function __construct() {
        parent::__construct();
        $this->_integrator->setModels('configuracion', 'Modulos');
        $this->formato = new Formato();
        $this->formatoModel = new FormatoModel();
        $this->parteFormato = new Parteformato();
    }

    public function formatoAction() {
        $this->render('formato');
    }

    public function getformatosAction() {
        echo json_encode($this->formato->getFormatos($this->dataPost, $this->dataSession->identidad));
    }

    public function addformatoAction() {
        echo json_encode($this->formatoModel->addFormato($this->dataPost));
    }

    public function modformatoAction() {
        echo json_encode($this->formatoModel->modFormato($this->dataRest));
    }

    public function delformatoAction() {
        echo json_encode($this->formatoModel->delFormato($this->dataPost));
    }

    public function getmodulosAction() {
        echo json_encode($this->formato->getModulos());
    }

    public function getpartesformatoAction() {
        echo json_encode($this->parteFormato->getPartesFormato($this->dataPost->idformato));
    }

    public function addparteformatoAction() {
        echo $this->formatoModel->addParteFormato($this->dataRest);
//        echo $this->formatoModel->addParteFormato($this->dataPost);
    }

    public function modparteformatoAction() {
        echo $this->formatoModel->modParteFormato($this->dataRest);
    }

    public function delparteformatoAction() {
        echo $this->formatoModel->delParteFormato($this->dataRest);
    }

    public function getinheritdataAction() {
        echo json_encode($this->formatoModel->getInheritData);
    }

    public function inheritformatoAction() {
        echo $this->formatoModel->inheritFormato($this->dataPost);
    }

}