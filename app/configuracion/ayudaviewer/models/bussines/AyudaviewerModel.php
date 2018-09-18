<?php

class AyudaviewerModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function Adicionar($argRequest) {
        try {
            $objAyudaviewer = new Ayudaviewer();
            $objAyudaviewer->idmodulo = $argRequest['idmodulo'];
            $objAyudaviewer->idfuncionalidades = $argRequest['idfuncionalidades'];
            $objAyudaviewer->referencia = $argRequest['referencia'];
            $objAyudaviewer->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            return 3;
        }
    }

    public function Eliminar($argIdConfAyudaviewer) {
        try {
            $objAyudaviewer = Doctrine_Core::getTable('Ayudaviewer')->find($argIdConfAyudaviewer);
            $objAyudaviewer->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
