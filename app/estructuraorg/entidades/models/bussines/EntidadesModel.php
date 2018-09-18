<?php

class EntidadesModel {

    public function setUp() {
        
    }

    public function saveEntidad($data) {
        try {
            $dat = json_decode($data->_dataPost['datos']);
            if (!$dat->identidad) {
                return $this->Adicionar($dat);
            } else {
                return $this->Modificar($dat);
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function saveArea($data) {
        try {
            $dat = json_decode($data->_dataPost['datos']);
            if (!$dat->idareaentidad) {
                return $this->AdicionarArea($dat);
            } else {
                return $this->ModificarArea($dat);
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Adicionar($post) {
        try {
            $objEnt = new Entidades();
            //se valida que no exista una entidad con el mismo nombre
            if ($objEnt->buscarEntidadesNombre($post->nombre) == 0) {
                $objEnt->foto = (isset($post->foto)) ? $post->foto : '';
                $objEnt->nombre = $post->nombre;
                $objEnt->abreviatura = $post->abreviatura;
                $objEnt->descripcion = $post->descripcion;
                $objEnt->idpadre = $post->idpadre;
                $objEnt->reeup = $post->reeup;
                $objEnt->nit = $post->nit;
                $objEnt->telefonos = $post->telefonos;
                $objEnt->correos = $post->correos;
                $objEnt->web = $post->web;
                $objEnt->iddpa = $post->iddpa;
                $objEnt->direccion = $post->direccion;
                $objEnt->dpaext = $post->dpaext;
                $objEnt->geoid = $post->geoid;
                $objEnt->padre = true; //true significa que es hijo
                $objEnt->save();
                //se pone como padre a la entidad padre
                $objEntPadre = Doctrine::getTable('Entidades')->find($post->idpadre);
                //si su padre era una hoja, se pone como padre
                if ($objEntPadre) {
                    $objEntPadre->padre = false; //false significa que no es hijo
                    $objEntPadre->save();
                }
                return array('success' => true, 'codMsg' => 1); //1 significa que adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            throw $exc;
            return array('success' => false, 'codMsg' => 3);
            ; //3 significa que dio error
        }
    }

    public function Modificar($post) {
        try {
            $Ent = new Entidades();
            //se valida que no exista una entidad con el mismo nombre
            if ($Ent->buscarEntidadesNombre($post->nombre, $post->identidad) == 0) {
                $objEnt = Doctrine::getTable('Entidades')->find($post->identidad);
                $objEnt->foto = (isset($post->foto)) ? $post->foto : '';
                $objEnt->nombre = $post->nombre;
                $objEnt->abreviatura = $post->abreviatura;
                $objEnt->descripcion = $post->descripcion;
                $objEnt->reeup = $post->reeup;
                $objEnt->nit = $post->nit;
                $objEnt->telefonos = $post->telefonos;
                $objEnt->correos = $post->correos;
                $objEnt->web = $post->web;
                $objEnt->iddpa = $post->iddpa;
                $objEnt->direccion = $post->direccion;
                $objEnt->dpaext = $post->dpaext;
                $objEnt->geoid = $post->geoid;
                $objEnt->save();
                return array('success' => true, 'codMsg' => 1); //1 significa que adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            return array('success' => false, 'codMsg' => 3); //3 significa que dio error
        }
    }

    public function Eliminar($idnodo) {
        try {//se verifica que no tenga datos asociados
            $UsuariosEnt = new UsuarioRolEnt();
            if ($UsuariosEnt->existeUserEntidad($idnodo) == 0) {
                $objEnt = Doctrine::getTable('Entidades')->find($idnodo);
                //si su padre tiene un solo hijo quedara como hijo al eliminarle el que tiene
                if (Entidades::buscarEntidadesIdpadre($objEnt->idpadre) == 1) {
                    $objEntPadre = Doctrine::getTable('Entidades')->find($objEnt->idpadre);
                    $objEntPadre->padre = true;
                    $objEntPadre->save();
                }
                $objEnt->delete();
                return 1;
            }
            else
                return 2;
        } catch (Exception $exc) {
            return 3;
        }
    }

    public function AdicionarArea($post) {
        try {
            $objAreaEntidad = new Areaentidad();
            if ($objAreaEntidad->buscarAreaEntidadNombre($post->nombre, $post->identidad) == 0) {
                $objAreaEnt = new Areaentidad();
                $objAreaEnt->codigo = $post->codigo;
                $objAreaEnt->abreviatura = $post->abreviatura;
                $objAreaEnt->nombre = $post->nombre;
                $objAreaEnt->idpadre = $post->idpadre;
                $objAreaEnt->padre = true; //true significa que es hijo
                $objAreaEnt->identidad = $post->identidad;
                $objAreaEnt->save();
                //se pone como padre a la entidad padre
                $objAreaEntPadre = Doctrine::getTable('AreaEntidad')->find($post->idpadre);
                //si su padre era una hoja, se pone como padre
                if ($objAreaEntPadre) {
                    $objAreaEntPadre->padre = false; //false significa que no es hijo
                    $objAreaEntPadre->save();
                }
                return array('success' => true, 'codMsg' => 1); //1 significa que adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            throw $exc;
            return array('success' => false, 'codMsg' => 3); //3 significa que dio error
        }
    }

    public function ModificarArea($post) {
        try {
            $objAreaEntidad = new Areaentidad();
            if ($objAreaEntidad->buscarAreaEntidadNombre($post->nombre, $post->identidad, $post->idareaentidad) == 0) {
                $objAreaEnt = Doctrine::getTable('Areaentidad')->find($post->idareaentidad);
                $objAreaEnt->codigo = $post->codigo;
                $objAreaEnt->abreviatura = $post->abreviatura;
                $objAreaEnt->nombre = $post->nombre;
                $objAreaEnt->save();
                return array('success' => true, 'codMsg' => 1); //1 significa que adiciono bien 
            } else {
                return array('success' => false, 'codMsg' => 2); //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            throw $exc;
            return array('success' => false, 'codMsg' => 3); //3 significa que dio error
        }
    }

    public function EliminarArea($idnodo) {
        try {
            $AreaEntidad = new Areaentidad();
            $objAreaEnt = Doctrine::getTable('Areaentidad')->find($idnodo);
            //si su padre tiene un solo hijo quedara como hijo al eliminarle el que tiene
            if ($AreaEntidad->buscarAreaentidadIdpadre($objAreaEnt->idpadre) == 1) {
                $objEntPadre = Doctrine::getTable('Areaentidad')->find($objAreaEnt->idpadre);
                $objEntPadre->padre = true;
                $objEntPadre->save();
            }
            if ($objAreaEnt->delete())
                return 1;
            else
                return 2;
        } catch (Exception $exc) {
            echo $exc;
            return 3;
        }
    }

    function loadDataDpa($argParams) {
        $fileSystem = $_SERVER['DOCUMENT_ROOT'] . "/comun/comun/xml/system.xml";
        $systemConf = simplexml_load_file($fileSystem);
        $argParams->_extraRequest->idpais = (int) $systemConf->parameters->idpais;
        $obj_dpa = new Dpa();
        return $obj_dpa->getDpaService($argParams->_extraRequest);
    }

}
