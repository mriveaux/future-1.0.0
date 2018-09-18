<?php

class TrabajadoresController extends ControllerSecure {

    private $trabajador;
    private $trabajadorModel;

    public function __construct() {
        parent::__construct();
        $this->trabajador = new Trabajador();
        $this->trabajadorModel = new TrabajadorModel();
    }

    public function trabajadoresAction() {
        $this->render('trabajadores');
    }

    public function cargartrabajadoresAction() {
        echo json_encode($this->trabajador->cargarTrabajadores($this->dataPost));
    }

    public function cargarBajasAction() {
        echo json_encode($this->trabajador->cargarBajas($this->dataPost, $this->dataSession->identidad));
    }

    public function adicionartrabajadorAction() {
        echo json_encode($this->trabajadorModel->adicionarTrabajador($this->dataPost));
    }

    public function modificartrabajadorAction() {
        echo json_encode($this->trabajadorModel->modificarTrabajador($this->dataPost));
    }

    public function eliminartrabajadorAction() {
        echo json_encode($this->trabajadorModel->eliminarTrabajador($this->dataPost->idtrabajador));
    }

    public function bajatrabajadorAction() {
        echo json_encode($this->trabajadorModel->BajaTrabajador($this->dataPost));
    }

    public function loadDataPreviewAction() {
        echo json_encode($this->trabajadorModel->loadDataPreview());
    }

    public function getPictureAction() {
        $dir_file = $_FILES["photoname"]["tmp_name"];
        $response = array('base64img' => -1);
        if (file_exists($dir_file)) {
            $response = $this->model->uploadedImg2Base64($dir_file);
        }
        echo json_encode($response);
    }

}
