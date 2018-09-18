<?php

class Paisdpa extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.conf_dpapais');
        $this->hasColumn('iddpapais', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.conf_dpapais_iddpapais'));
        $this->hasColumn('idpais', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idtipodpa', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpadre', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('leaf', 'boolean', 1, array('notnull' => false, 'primary' => false, 'default' => true));
    }

    public function countLeaves($idPais, $idTipoDpa) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('idpadre')->from('Paisdpa')
                    ->where('idpais = ? AND idtipodpa <> ?', array($idPais, $idTipoDpa))
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            return $result->count();
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        }
    }

}
