<?php

class ClienteModel extends ModelSecure {

    public function setUp() {
        parent::__construct();
    }

    public function addCliente($post) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {

            if (Cliente::buscaClienteExistente($post)->count() > 0) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objAddCliente = new Cliente();
                $objAddCliente->nombre = $post->nombre;
                $objAddCliente->abreviatura = $post->abreviatura;
                $objAddCliente->nombre = $post->nombre;
                $objAddCliente->idorganismo = $post->idorganismo;
                $objAddCliente->codigoreeup = $post->codigoreeup;
                $objAddCliente->codigonit = $post->codigonit;
                $objAddCliente->descripcion = $post->descripcion;
                $objAddCliente->tipo = $post->tipo;
                $objAddCliente->tipopersona = $post->tipopersona;
                $objAddCliente->estado = $post->estado;
                $objAddCliente->direccion = $post->direccion;
                $arrayContactos = json_decode($post->contactos);
                if (count($arrayContactos) > 0) {
                    foreach ($arrayContactos as $key => $dataContacto) {
                        $objAddCliente->Contactocliente[$key]->nombre = $dataContacto->nombre;
                        $objAddCliente->Contactocliente[$key]->cargo = $dataContacto->cargo;
                        $objAddCliente->Contactocliente[$key]->correos = $dataContacto->correos;
                        $objAddCliente->Contactocliente[$key]->telefonos = $dataContacto->telefonos;
                    }
                }
                $objAddCliente->save();
                $cc->commit();
                return 1;
            }
        } catch (Doctrine_Exception $exc) {
            print_r("<pre><br>");
            print_r($exc);
            die();
            $cc->rollback();
            return 3;
        }
    }

    public function modCliente($post) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            if (Cliente::buscaClienteExistente($post)->count() > 0) {
                return 2;
            } else {
                $cc->beginTransaction();
                $objModCliente = Doctrine::getTable('Cliente')->find($post->idcliente);
                $objModCliente->nombre = $post->nombre;
                $objModCliente->abreviatura = $post->abreviatura;
                $objModCliente->nombre = $post->nombre;
                $objModCliente->idorganismo = $post->idorganismo;
                $objModCliente->codigoreeup = $post->codigoreeup;
                $objModCliente->codigonit = $post->codigonit;
                $objModCliente->descripcion = $post->descripcion;
                $objModCliente->tipo = $post->tipo;
                $objModCliente->tipopersona = $post->tipopersona;
                $objModCliente->estado = $post->estado;
                $objModCliente->direccion = $post->direccion;
                $arrayContactos = json_decode($post->contactos);
                if (count($arrayContactos) > 0) {
                    foreach ($arrayContactos as $key => $dataContacto) {
                        if ($dataContacto->idcontactocliente != null) {
                            $objContactocliente = Doctrine::getTable('Contactocliente')->find($dataContacto->idcontactocliente);
                            $objContactocliente->nombre = $dataContacto->nombre;
                            $objContactocliente->cargo = $dataContacto->cargo;
                            $objContactocliente->correos = $dataContacto->correos;
                            $objContactocliente->telefonos = $dataContacto->telefonos;
                            $objModCliente->Contactocliente[$key] = $objContactocliente;
                        } else {
                            $objModCliente->Contactocliente[$key]->nombre = $dataContacto->nombre;
                            $objModCliente->Contactocliente[$key]->cargo = $dataContacto->cargo;
                            $objModCliente->Contactocliente[$key]->correos = $dataContacto->correos;
                            $objModCliente->Contactocliente[$key]->telefonos = $dataContacto->telefonos;
                        }
                    }
                }
                $objModCliente->save();
                $cc->commit();
                return 1;
            }
        } catch (Exception $exc) {
            $cc->rollback();
            return 3;
        }
    }

    public function delCliente($idCliente) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $objCliente = Doctrine::getTable('Cliente')->find($idCliente);
            $objCliente->delete();
            $cc->commit();
            return 1;
        } catch (Exception $exc) {
            $cc->rollback();
            return 2;
        }
    }

    public function loadDataPreview() {
        try {
            $objCliente = new Cliente();
            $clientes = $objCliente->getDataClientes();
            $elements = array();
            if (count($clientes))
                foreach ($clientes as &$v) {
                    $cliente = new stdClass();
                    $cliente->organismo = $v['organismo'];
                    $cliente->abreviatura = $v['abreviatura'];
                    $cliente->nombre = $v['nombre'];
                    $cliente->reeup = $v['codigoreeup'];
                    $cliente->nit = $v['codigonit'];
                    $elements[] = $cliente;
                }
            $datoGeneral = new stdClass();
            $datoGeneral->reporte = 'CRM001';
            $datoGeneral->titulo = 'LISTADO DE CLIENTES';
            $datoGeneral->entidad = $this->dataSession->desc_entidad;
            return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $elements);
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function delContacto($idContactocliente) {
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        try {
            $cc->beginTransaction();
            $objContactocliente = Doctrine::getTable('Contactocliente')->find($idContactocliente);
            $objContactocliente->delete();
            $cc->commit();
            return 1;
        } catch (Exception $exc) {
            $cc->rollback();
            return 2;
        }
    }

}
