<?php

class Candidato extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Procesoseleccion', array('local' => 'idprocesoseleccion', 'foreign' => 'idprocesoseleccion'));
        $this->hasOne('Persona', array('local' => 'idpersona', 'foreign' => 'idpersona'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_candidato');
        $this->hasColumn('idcandidato', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.dat_candidato_idcandidato'));
        $this->hasColumn('idprocesoseleccion', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idpersona', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

    public function getCandidatos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Candidato p')->innerJoin('p.Cargoplantilla cp')
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Candidato p')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $identidad = $_SESSION['identidad'];
            $query->addWhere("p.identidad = " . $identidad);
            $queryCount->addWhere("p.identidad = " . $identidad);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("p.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("p.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('p.fechainicio DESC,p.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getCandidatosService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Candidato p')->innerJoin('p.Cargoplantilla cp')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $identidad = $_SESSION['identidad'];
            $query->addWhere("p.identidad = " . $identidad);
            if (isset($post->status)) {
                $arrStatus = implode(',', $post->status);
                $query->addWhere("p.status IN ($arrStatus)");
            }
            $query->addOrderBy('p.fechainicio DESC,p.nombre');
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
