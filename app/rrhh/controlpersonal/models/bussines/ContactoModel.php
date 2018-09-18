<?php

class ContactoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addContacto($data) {
        try {
            $contacto = new Contacto();
            $contacto->idpersona = $data->idpersona;
            $contacto->idtipocontacto = $data->tipocontacto;
            $contacto->idmediocontacto = $data->mediocontacto;
            $contacto->contacto = $data->contacto;
            $contacto->rector = (isset($data->rector)) ? 1 : 0;
            if ($contacto->rector == 1)
                $this->setRector($data->idpersona);
            $contacto->save();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            echo $e;
            throw $e;
        }
    }

    public function modContacto($data) {
        try {
            $contacto = Doctrine_Core::getTable('Contacto')->find($data->idcontacto);
            if (is_int($data->tipocontacto))
                $contacto->idtipocontacto = $data->tipocontacto;
            if (is_int($data->mediocontacto))
                $contacto->idmediocontacto = $data->mediocontacto;
            $contacto->contacto = $data->contacto;
            $contacto->rector = (isset($data->rector)) ? 1 : 0;
            if ($contacto->rector == 1)
                $this->setRector($data->idpersona);
            $contacto->save();
            return "{'success':true, 'codMsg':1, 'message': ''}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delContacto($data) {
        try {
            $contacto = Doctrine_Core::getTable('Contacto')->find($data->idcontacto);
            $contacto->delete();
            return "{'success':true, 'codMsg':1}";
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    private function setRector($idpersona) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        $cc->fetchAll("UPDATE rrhh.dat_contacto 
                        SET rector = 0
                        WHERE idpersona = $idpersona");
    }

}
