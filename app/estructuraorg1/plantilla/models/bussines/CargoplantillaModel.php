<?php

class CargoplantillaModel {

    public function setUp() {
        
    }

    public function loadAreasEntidad($argIdEntidad) {
        $AreaEntidad = new Areaentidad();
        $arrayAreas = array();
        $firstLevel = $AreaEntidad->getDataAreaEntidadIdpadre(0, $argIdEntidad);
        $children = array();
        foreach ($firstLevel as $v) {
            $objArea = new stdClass();
            $objArea->idareaentidad = $v['idareaentidad'];
            $objArea->nombre = $v['nombre'];
            $arrayAreas[] = $objArea;
            $children = $this->recursiveSearch($AreaEntidad->getDataAreaEntidadIdpadre($v['idareaentidad']));
            $arrayAreas = array_merge($arrayAreas, $children);
        }
        return array('data' => $arrayAreas);
    }

    function recursiveSearch($argArrAreas, $argArrAdyacents = array()) {
        $AreaEntidad = new Areaentidad();
        foreach ($argArrAreas as $v) {
            $objArea = new stdClass();
            $objArea->id = $v['idareaentidad'];
            $objArea->nombre = $v['nombre'];
            $argArrAdyacents[] = $objArea;
            if ($v['padre'] != 1) {
                $this->recursiveSearch($AreaEntidad->getDataAreaEntidadIdpadre($v['idareaentidad'], $argArrAdyacents));
            }
        }
        return $argArrAdyacents;
    }

    public function Adicionar($post) {
        try {
            $objCargoPlantilla = new Cargoplantilla();
            if ($objCargoPlantilla->existCargoPlantilla($post->nombre, $post->identidad) == 0) {
                $objCargoPlantilla->nombre = $post->nombre;
                $objCargoPlantilla->idtipocargo = $post->idtipocargo;
                $objCargoPlantilla->idtipoescala = $post->idtipoescala;
                $objCargoPlantilla->idgrupoescala = $post->idgrupoescala;
                $objCargoPlantilla->idsalario = $post->idsalario;
                $objCargoPlantilla->idnivelprep = $post->idnivelprep;
                $objCargoPlantilla->idcategoriaocup = $post->idcategoriaocup;
                $objCargoPlantilla->cantidad = $post->cantidad;
                $objCargoPlantilla->idareaentidad = $post->idareaentidad;
                $objCargoPlantilla->identidad = $post->identidad;
                $objCargoPlantilla->save();
                return 1; //adiciono bien
            } else {
                return 2; //2 significa que existe 
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function Modificar($post) {
        try {
            $objCargoPlantilla = new Cargoplantilla();
            if ($objCargoPlantilla->existCargoPlantilla($post->nombre, $post->identidad, $post->idcargoplantilla) == 0) {
                $objCargoPlantilla = Doctrine::getTable('Cargoplantilla')->find($post->idcargoplantilla);
                $objCargoPlantilla->nombre = $post->nombre;
                $objCargoPlantilla->idtipocargo = $post->idtipocargo;
                $objCargoPlantilla->idtipoescala = $post->idtipoescala;
                $objCargoPlantilla->idgrupoescala = $post->idgrupoescala;
                $objCargoPlantilla->idsalario = $post->idsalario;
                $objCargoPlantilla->idnivelprep = $post->idnivelprep;
                $objCargoPlantilla->idcategoriaocup = $post->idcategoriaocup;
                $objCargoPlantilla->cantidad = $post->cantidad;
                $objCargoPlantilla->idareaentidad = $post->idareaentidad;
                $objCargoPlantilla->save();
                return 1; //modifico bien
            } else {
                return 2; //2 significa que existe
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function Eliminar($argIdCargoplantilla) {
        try {
            $objCargoPlantilla = Doctrine::getTable('Cargoplantilla')->find($argIdCargoplantilla);
            $objCargoPlantilla->delete();
            return 1;
        } catch (Exception $exc) {
            return 2; //en uso
        }
    }

    public function loadDataCargo($post) {
        $response = new stdClass();
        $Tipocargo = new Tipocargo();
        $response->Tipocargo = $Tipocargo->getAllTipoCargo();

        $Tipoescala = new Tipoescala();
        $response->Tipoescala = $Tipoescala->getAllTipoEscala();

        $Grupoescala = new Grupoescala();
        $response->Grupoescala = $Grupoescala->getAllGrupoEscala();

        $NivelPrep = new Nivelprep();
        $response->NivelPrep = $NivelPrep->getAllNivelPrep();

        $Categoriaocup = new Categoriaocup();
        $response->Categoriaocup = $Categoriaocup->getAllCategoriaocup();

        if ($post->idsalario) {
            $Salario = new Salario();
            $response->Salario = $Salario->getSalarioById($post->idsalario);
        }

        $response->AreasEntidad = $this->loadAreasEntidad($post->identidad);

        return $response;
    }

    public function ocuparCargoService($argIdCargo) {
        try {
            $objCargoPlantilla = Doctrine::getTable('Cargoplantilla')->find($argIdCargo);
            $objCargoPlantilla->cantocupado = $objCargoPlantilla->cantocupado + 1;
            $objCargoPlantilla->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
            return 3;
        }
    }

    public function loadDataPreview($argRequest) {
        $obj_CargoP = new Cargoplantilla();
        $falseParams = new stdClass();
        $falseParams->start = 0;
        $falseParams->limit = 1000;
        $falseParams->identidad = $argRequest->identidad;
        $dataPlantilla = $obj_CargoP->loadDataCargoPlantilla($falseParams);

        $datoCuerpo = array();
        if (count($dataPlantilla['data']))
            foreach ($dataPlantilla['data'] as $k => $v) {
                $plant = new stdClass();
                $plant->No = $k + 1;
                $plant->nombre = $v['nombre'];
                $plant->tipocargo = $v['Tipocargo']['nombre'];
                $plant->tipoescala = $v['Tipoescala']['nombre'];
                $plant->grupoescala = $v['Grupoescala']['nombre'];
                $plant->salario = $v['Salario']['salario'];
                $plant->nivelprep = $v['Nivelprep']['nombre'];
                $plant->categoria = $v['Categoriaocup']['nombre'];
                $plant->area = $v['Areaentidad']['nombre'];
                $plant->abrevarea = $v['Areaentidad']['abreviatura'];
                $plant->cantidad = $v['cantidad'];
                $plant->disponible = $v['cantidad'] - $v['cantocupado'];
                $datoCuerpo[] = $plant;
            }
        $datoGeneral = new stdClass();
        $datoGeneral->reporte = 'ESTR001';
        $datoGeneral->titulo = 'Plantilla de ' . $argRequest->entidad;
        $datoGeneral->fecha = date('d/m/Y');
        $datoGeneral->entidad = $argRequest->entidad;
        return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $datoCuerpo);
    }

}