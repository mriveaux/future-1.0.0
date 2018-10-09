<?php

class EntidadesModel {

    public function setUp() {
        
    }

    static public function Adicionar($post) {
        try {
            //se valida que no esxista una entidad con el mismo nombre
            if (Entidades::buscarEntidadesNombre($post->nombre) == 0) {
                $objEnt = new Entidades();
                $objEnt->foto = (isset($post->base64img)) ? $post->base64img : '';
                $objEnt->nombre = $post->nombre;
                $objEnt->abreviatura = $post->abreviatura;
                $objEnt->descripcion = $post->descripcion;
                $objEnt->idpadre = $post->idpadre;
                $objEnt->reeup = $post->reeup;
                $objEnt->nit = $post->nit;
                $objEnt->telefonos = $post->telefonos;
                $objEnt->correos = $post->correos;
                $objEnt->web = $post->web;
                $objEnt->idterritorio = $post->idterritorio;
                $objEnt->direccion = $post->direccion;
                $objEnt->padre = true; //true significa que es hijo
                $objEnt->save();
                //se pone como padre a la entidad padre
                $objEntPadre = Doctrine::getTable('Entidades')->find($post->idpadre);
                //si su padre era una hoja, se pone como padre
                if ($objEntPadre) {
                    $objEntPadre->padre = false; //false significa que no es hijo
                    $objEntPadre->save();
                }
                return 1; //1 significa que adiciono bien 
            } else {
                return 2; //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            return 3; //3 significa que dio error
        }
    }

    static public function Modificar($post) {
        try {
            //se valida que no esxista una entidad con el mismo nombre
            if (Entidades::buscarEntidadesNombre($post->nombre, $post->idnodo) == 0) {
                $objEnt = Doctrine::getTable('Entidades')->find($post->idnodo);
                $objEnt->foto = (isset($post->base64img)) ? $post->base64img : '';
                $objEnt->nombre = $post->nombre;
                $objEnt->abreviatura = $post->abreviatura;
                $objEnt->descripcion = $post->descripcion;
                $objEnt->reeup = $post->reeup;
                $objEnt->nit = $post->nit;
                $objEnt->telefonos = $post->telefonos;
                $objEnt->correos = $post->correos;
                $objEnt->web = $post->web;
                $objEnt->idterritorio = $post->idterritorio;
                $objEnt->direccion = $post->direccion;
                $objEnt->save();
                return 1; //1 significa que adiciono bien 
            } else {
                return 2; //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            return 3; //3 significa que dio error
        }
    }

    static public function Eliminar($idnodo) {
        try {//se verifica que no tenga datos asociados
            $UsuariosEnt = new UsuariosEnt();
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
                return 1; //1 significa que adiciono bien 
            } else {
                return 2; //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            return 3; //3 significa que dio error
        }
    }

    public function ModificarArea($post) {
        try {
            $objAreaEntidad = new Areaentidad();
            if ($objAreaEntidad->buscarAreaEntidadNombre($post->nombre, $post->identidad, $post->idnodo) == 0) {
                $objAreaEnt = Doctrine::getTable('Areaentidad')->find($post->idnodo);
                $objAreaEnt->codigo = $post->codigo;
                $objAreaEnt->abreviatura = $post->abreviatura;
                $objAreaEnt->nombre = $post->nombre;
                $objAreaEnt->save();
                return 1; //1 significa que adiciono bien 
            } else {
                return 2; //2 significa que esxiste la entidad
            }
        } catch (Exception $exc) {
            echo $exc;
            return 3; //3 significa que dio error
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

}
