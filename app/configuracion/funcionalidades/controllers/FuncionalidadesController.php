<?php

class FuncionalidadesController extends ControllerSecure {

    public function __construct() {
        parent::__construct();
        $this->_integrator->setModels('configuracion', 'Modulos');
        $this->_integrator->setModels('seguridad', 'Roles');
    }

    public function funcionalidadesAction() {
        $this->render('funcionalidades');
    }

    public function cargarmodulosAction() {
        echo json_encode(Modulos::cargarModulos($this->dataPost));
    }

    public function cargarfuncionalidadesAction() {
        echo json_encode(Funcionalidades::buscarFuncionalidades($this->dataPost));
    }

    function adicionarfuncionalidadAction() {
        echo json_encode(FuncionalidadesModel::adicionarFuncionalidad($this->dataPost));
    }

    function modificarfuncionalidadAction() {
        echo json_encode(FuncionalidadesModel::modificarFuncionalidad($this->dataPost));
    }

    function eliminarfuncionalidadAction() {
        echo json_encode(FuncionalidadesModel::eliminarFuncionalidad($this->dataPost->idnodo));
    }

}
