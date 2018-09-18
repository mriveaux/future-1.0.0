<?php

class Maestros extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        
    }

    public function getMaestros() {
        try {
            $masters = [];
            $masters[] = array('idmaestro' => 990001,
                'maestro' => 'Categor&iacute;as de documentos de identidad',
                'clsName' => 'Maestros.view.categoriadoc.List',
                'alias' => 'list_categoriadoc');
            $masters[] = array('idmaestro' => 990002,
                'maestro' => 'Estratificaci&oacute;n social',
                'clsName' => 'Maestros.view.estratificacion.List',
                'alias' => 'list_estratificacion');
            $masters[] = array('idmaestro' => 990003,
                'maestro' => 'Tipo de preparaci&oacute;n',
                'clsName' => 'Maestros.view.tipopreparacion.List',
                'alias' => 'list_tipopreparacion');
            $masters[] = array('idmaestro' => 990004,
                'maestro' => 'Grupo sangu&iacute;neo',
                'clsName' => 'Maestros.view.gruposanguineo.List',
                'alias' => 'list_gruposanguineo');
            $masters[] = array('idmaestro' => 990005,
                'maestro' => 'Medio de contacto',
                'clsName' => 'Maestros.view.mediocontacto.List',
                'alias' => 'list_mediocontacto');
            $masters[] = array('idmaestro' => 990006,
                'maestro' => 'Nivel de educaci&oacute;n',
                'clsName' => 'Maestros.view.niveleducacion.List',
                'alias' => 'list_niveleducacion');
            $masters[] = array('idmaestro' => 990007,
                'maestro' => 'Prenda',
                'clsName' => 'Maestros.view.prenda.List',
                'alias' => 'list_prenda');
            $masters[] = array('idmaestro' => 990008,
                'maestro' => 'Procedencia social',
                'clsName' => 'Maestros.view.procedencia.List',
                'alias' => 'list_procedencia');
            $masters[] = array('idmaestro' => 990009,
                'maestro' => 'Tipo de contacto',
                'clsName' => 'Maestros.view.tipocontacto.List',
                'alias' => 'list_tipocontacto');

            return array('data' => $masters, 'total' => count($masters));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
