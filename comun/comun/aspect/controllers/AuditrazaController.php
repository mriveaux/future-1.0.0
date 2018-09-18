<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class/ControllerSecure.php');

class AuditrazaController extends ControllerSecure {

    private $auditraceModel;
    private $histrace;
    private $hisTraceAuth;

    public function __construct() {
        parent::__construct(FALSE);
        $this->_integrator->setModels('seguridad', 'Usuarios');
        $this->_integrator->setModels('seguridad', 'Roles');
        $this->_integrator->setModels('seguridad', 'Gruporoles');
        $this->_integrator->setModels('configuracion', 'Funcionalidades');
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->auditraceModel = new AuditraceModel();
        $this->histrace = new Histrace();
        $this->hisTraceAuth = new Histraceauth();
    }

    public function auditrazaAction() {
        $this->render('auditraza');
    }

    public function loadDetllesTrazaAction() {
        echo json_encode($this->histrace->loadDetllesTraza($this->dataPost, $this->dataSession->identidad));
    }

    public function loadDetllesAuthAction() {
        echo json_encode($this->hisTraceAuth->loadDetllesAuth($this->dataPost));
    }

    public function loadDataUsuariosAction() {
        echo json_encode($this->auditraceModel->loadDataUsuarios());
    }

    public function loadFuncionalidadesPorDiaAction() {
        echo json_encode($this->auditraceModel->loadFuncionalidadesPorDia());
    }

    public function loadAccesosPorDiaAction() {
        echo json_encode($this->auditraceModel->loadAccesosPorDia());
    }

    public function loadaccesosporentidadAction() {
        echo json_encode($this->auditraceModel->loadAccesosPorEntidad());
    }

    public function loadlastaccesswrongAction() {
        echo json_encode($this->auditraceModel->loadLastAccessWrong());
    }

    public function loadtraficlastsevendaysAction() {
        echo json_encode($this->auditraceModel->loadTraficLastSevenDays());
    }

    public function loadaspectsconfigAction() {
        echo(json_encode($this->auditraceModel->loadAspectsConfig()));
    }

    public function saveaspectconfigAction() {
        echo(json_encode($this->auditraceModel->saveAspectsConfig($this->dataPost)));
    }

    public function deletetracesAction() {
        echo(json_encode($this->auditraceModel->deleteTraces($this->dataPost)));
    }

    public function deletehistracesAction() {
        echo(json_encode($this->auditraceModel->deleteHisTraces($this->dataPost)));
    }

}
