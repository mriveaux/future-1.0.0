<?php

class RolesController extends ControllerSecure {

    private $roles;
    private $rolesModel;

    public function __construct() {
        parent::__construct();
        $this->roles = new Roles();
        $this->rolesModel = new RolesModel();
        $this->_integrator->setModels('configuracion', 'Modulos');
        $this->_integrator->setModels('configuracion', 'Funcionalidades');
    }

    public function rolesAction() {
        $this->render('roles');
    }

    public function cargarrolesAction() {
        echo json_encode($this->roles->cargarRoles($this->dataPost));
    }

    public function loaddatafuncionalidadesbyrolAction() {
        echo json_encode($this->rolesModel->loadDataFuncionalidadByRol($this->dataPost));
    }

    public function loaddatarecursobyfuncionalidadAction() {
        echo json_encode($this->rolesModel->loadDataRecursoByFuncionalidad($this->dataPost));
    }

    public function cargarmodulosAction() {
        echo json_encode(Modulos::cargarModulos($this->dataPost));
    }

    public function cargarfuncionalidadesAction() {
        echo json_encode(Funcionalidades::cargarFuncionalidadesCheck($this->dataPost->idmodulo, $this->dataPost->node, $this->dataPost->idrol));
    }

    public function adicionarrolAction() {
        echo json_encode($this->rolesModel->Adicionar($this->dataPost->nombre, $this->dataPost->descripcion));
    }

    public function modificarrolAction() {
        echo json_encode($this->rolesModel->Modificar($this->dataPost->idrol, $this->dataPost->nombre, $this->dataPost->descripcion));
    }

    public function eliminarrolAction() {
        echo json_encode($this->rolesModel->Eliminar($this->dataPost->idrol));
    }

    public function accesofuncionalidadesAction() {
        echo json_encode($this->rolesModel->saveRolesFunct($this->dataPost));
    }

    public function accesorecursosAction() {
        echo json_encode($this->rolesModel->saveAccesoRecursos($this->dataPost));
    }

}
