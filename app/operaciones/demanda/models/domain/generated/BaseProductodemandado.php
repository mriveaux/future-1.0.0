<?php

abstract class BaseProductodemandado extends Doctrine_Record
{

    public function setTableDefinition()
    {
        $this->setTableName('comercial.productodemandado');
        $this->hasColumn('idproductodemandado', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'comercial.productodemandado_idproductodemandado'));
        $this->hasColumn('cantidad', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpedido', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('iddemanda', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcliente', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function Setup()
    {
        parent::setUp();
    }

}
