<?php

class Fenotipo extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Gruposanguineo', array('local' => 'idgruposanguineo', 'foreign' => 'idgruposanguineo'));
        $this->hasOne('Colorpiel', array('local' => 'idcolorpiel', 'foreign' => 'idcolorpiel'));
        $this->hasOne('Colorojos', array('local' => 'idcolorojos', 'foreign' => 'idcolorojos'));
        $this->hasOne('Colorpelo', array('local' => 'idcolorpelo', 'foreign' => 'idcolorpelo'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_fenotipo');
        $this->hasColumn('idfenotipo', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_fenotipo_idfenotipo'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idgruposanguineo', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcolorojos', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcolorpelo', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcolorpiel', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estatura', 'numeric', 5, array('notnull' => false, 'primary' => false));
        $this->hasColumn('peso', 'numeric', 5, array('notnull' => false, 'primary' => false));
        $this->hasColumn('observacion', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function getFenotipo($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Fenotipo f')->innerJoin('f.Gruposanguineo g')->innerJoin('f.Colorpiel cp')
                    ->innerJoin('f.Colorojos co')->innerJoin('f.Colorpelo ce')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $query->addWhere("f.idpersona = " . $post->_request['idpersona']);
            $result = $query->execute();
            return array('data' => $result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
