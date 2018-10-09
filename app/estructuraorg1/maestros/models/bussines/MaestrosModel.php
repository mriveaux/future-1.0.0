<?php

class MaestrosModel {

    public function setUp() {
        
    }

    public function loadListMasters() {
        $arrayListMasters = array();
        $arrayListMasters[] = array("id" => 0, "text" => "Tipo de escala salarial", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/tipoescala/tipoescala");
        $arrayListMasters[] = array("id" => 1, "text" => "Grupo de escala salarial", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/grupoescala/grupoescala");
        $arrayListMasters[] = array("id" => 2, "text" => "Salario", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/salario/salario");
        $arrayListMasters[] = array("id" => 3, "text" => "Escala salarial", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/escalasalarial/escalasalarial");
        $arrayListMasters[] = array("id" => 4, "text" => "Categor&iacute;a ocupacional", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/categoriaocup/categoriaocup");
        $arrayListMasters[] = array("id" => 5, "text" => "Nivel de preparaci&oacute;n", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/nivelprep/nivelprep");
        $arrayListMasters[] = array("id" => 6, "text" => "Tipo de cargo", "leaf" => true, "src" => "/app/estructuraorg/maestros/index.php/tipocargo/tipocargo"/* ,
                  "children"=>array(array("text" => "adadas", "leaf" => true, "descripcion" => "RT1", "src" => "../../../informes/index.php/rt1/rt1")) */);
        return $arrayListMasters;
    }

}
