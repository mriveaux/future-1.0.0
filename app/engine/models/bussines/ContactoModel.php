<?php

class ContactoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function getContactoEntidades() {
        $objEntidades = new Entidades();
        return $objEntidades->getAllEntity();
    }

}
