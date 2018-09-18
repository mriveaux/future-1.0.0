<?php

class UsuariosController extends ControllerSecure {

    private $usuarios;
    private $usuariosModel;
    private $usuarioRolEnt;
    private $gruporoles;

    public function __construct() {
        parent::__construct();
        $this->usuarios = new Usuarios();
        $this->usuariosModel = new UsuariosModel();
        $this->usuarioRolEnt = new UsuarioRolEnt();
        $this->_integrator->setModels('seguridad', 'Roles');
        $this->_integrator->setModels('seguridad', 'Gruporoles');
        $this->_integrator->setModels('estructuraorg', 'Entidades');
        $this->_integrator->setModels('capitalhumano', 'Trabajadores');
        $this->gruporoles = new GrupoRoles();
    }

    public function usuariosAction() {
        $this->render('usuarios');
    }

    public function cargarusuariosAction() {
        echo(json_encode($this->usuarios->cargarUsuarios($this->dataPost)));
    }

    public function cargarEntidadesAction() {
        echo json_encode($this->usuarioRolEnt->loadDataUsuarioRolEntidad($this->dataPost->idusuario, $this->dataPost->idroles, $this->dataPost->node));
    }

    public function cargarperfilesAction() {
        $Trabajador = new Trabajador();
        echo json_encode($Trabajador->cargarTrabajadores($this->dataPost));
    }

    public function saveconfigaccesoentidadesAction() {
        echo json_encode($this->usuariosModel->saveConfigAccesoEntidades($this->dataPost));
    }

    public function changepasswdAction() {
        echo json_encode($this->usuariosModel->cambiarContrasenna($this->dataPost->usuario, $this->dataPost->newpass));
    }

    public function cargargruporolesAction() {
        echo json_encode($this->gruporoles->loadDataGrupoRoles($this->dataPost));
    }

    public function cargarrolesAction() {
        echo json_encode($this->usuariosModel->loadDataRoles($this->dataPost));
    }

    public function adicionarusuarioAction() {
        echo json_encode($this->usuariosModel->Insertar($this->dataPost, $this->dataSession->identidad));
    }

    public function modificarusuarioAction() {
        echo json_encode($this->usuariosModel->Actualizar($this->dataPost));
    }

    public function eliminarusuarioAction() {
        echo json_encode($this->usuariosModel->Eliminar($this->dataPost->idusuario));
    }

    public function asignarperfilAction() {
        echo json_encode($this->usuariosModel->asignarPerfil($this->dataPost->idusuario, $this->dataPost->idperfil));
    }

    public function getldapusersAction() {
        echo json_encode($this->usuariosModel->getLdapUsers($this->dataPost));
    }

}
