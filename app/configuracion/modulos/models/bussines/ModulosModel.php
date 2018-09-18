<?php

class ModulosModel {

    public function setUp() {
        
    }

    public function Insertar($argData) {
        $result = true;
        try {
            $folder = $_SERVER['DOCUMENT_ROOT'] . "/app/$argData->abreviatura";
            if (!file_exists($folder))
                mkdir($folder, 0777);
            $mod = new Modulos();
            $mod->nombre = $argData->nombre;
            $mod->descripcion = $argData->descripcion;
            $mod->icono = $argData->icono;
            $mod->abreviatura = $argData->abreviatura;
            $mod->indice = $argData->indice;
            $mod->label = $argData->label;
            $mod->save();
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function Modificar($argData) {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $actmod = $cc->getTable('Modulos')->find($argData->idmodulo);
            $actmod->nombre = $argData->nombre;
            $actmod->descripcion = $argData->descripcion;
            $actmod->icono = $argData->icono;
            $actmod->indice = $argData->indice;
            $actmod->label = $argData->label;
            $actmod->save();
            return true;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function Eliminar($id) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('Count(f.idfuncionalidades)')
                    ->from('Funcionalidades f')
                    ->where('f.idmodulo=?', $id)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            if ($result[0]['Count'] <= 0) {
                Doctrine_Query::create()
                        ->delete()
                        ->from('Modulos m')
                        ->where('m.idmodulo=?', $id)
                        ->execute();
                return 1; //elimino
            } else {
                return 2; //tiene funcionalidades asociadas
            }
        } catch (Doctrine_Exception $e) {
            return 3; //error en la conexion            
        }
    }

}
