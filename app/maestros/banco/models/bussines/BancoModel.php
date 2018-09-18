<?php

class BancoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addBanco($data) {
        try {
            $banco = new Banco();
            $banco->idbanco = $data->idbanco;
            $banco->banco = $data->banco;
            $banco->codigo = $data->codigo;
            $banco->abreviatura = $data->abreviatura;
            $banco->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modBanco($data) {
        try {
            $banco = Doctrine_Core::getTable('banco')->find($data->idbanco);
            $banco->banco = $data->banco;
            $banco->codigo = $data->codigo;
            $banco->abreviatura = $data->abreviatura;
            $banco->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delBanco($data) {
        try {
            $idBanco = $data->idbanco;
            $banco = Doctrine_Core::getTable('banco')->find($idBanco);
            $banco->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
