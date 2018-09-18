<?php

/**
 * Description of OrganismoController
 *
 * @author adolfo
 */
class OrganismoController extends ControllerSecure {

    public $organismo;
    public $organismoModel;

    public function __construct() {
        $this->organismo = new Organismo();
        $this->organismoModel = new OrganismoModel();
    }

    public function organismoAction() {
        $this->render('organismo');
    }

    public function cargarorganismoAction() {
        echo json_encode($this->organismo->cargarOrganismo($_POST));
    }

    public function adicionarorganismoAction() {
        echo json_encode($this->organismoModel->Adicionar($_POST));
    }

    public function modificarorganismoAction() {
        echo json_encode($this->organismoModel->Modificar($_POST));
    }

    public function eliminarorganismoAction() {
        echo json_encode($this->organismoModel->Eliminar($_POST['idorganismo']));
    }

}