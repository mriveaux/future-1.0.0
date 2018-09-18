<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class/ControllerSecure.php');

class TrazaController extends ControllerSecure {

    private $traceModel;
    private $trace;
    private $traceAuth;

    public function __construct() {
        parent::__construct(FALSE);
        $this->_integrator->setModels('seguridad', 'Usuarios');
        $this->_integrator->setModels('seguridad', 'Roles');
        $this->_integrator->setModels('seguridad', 'Gruporoles');
        $this->_integrator->setModels('configuracion', 'Funcionalidades');
        $this->traceModel = new TraceModel();
        $this->trace = new Trace();
        $this->traceAuth = new Traceauth();
    }

    public function trazaAction() {
        $this->render('traza');
    }

    public function loadDetllesTrazaAction() {
        echo json_encode($this->trace->loadDetllesTraza($this->dataPost, $this->dataSession->identidad));
    }

    public function loadDetllesAuthAction() {
        echo json_encode($this->traceAuth->loadDetllesAuth($this->dataPost));
    }

    public function loadTipoTrazaAction() {
        echo json_encode($this->traceModel->loadTipoTraza());
    }

    public function loadDataUsuariosAction() {
        echo json_encode($this->traceModel->loadDataUsuarios());
    }

    public function loadFuncionalidadesPorDiaAction() {
        echo json_encode($this->traceModel->loadFuncionalidadesPorDia());
    }

    public function loadAccesosPorDiaAction() {
        echo json_encode($this->traceModel->loadAccesosPorDia());
    }

    public function addActionTrace($url, $className, $actionName, $jsonParams) {
        $this->traceModel->addActionTrace($url, $className, $actionName, $jsonParams);
    }

    public function addLogginTrace($url, $className, $actionName, $jsonParams) {
        $this->traceModel->addLogginTrace($url, $className, $actionName, $jsonParams);
    }

    public function loadDataPreviewAction() {
        echo json_encode($this->TrabajadorModel->loadDataPreview());
    }

}
