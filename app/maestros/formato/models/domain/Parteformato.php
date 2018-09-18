<?php


class Parteformato extends Doctrine_Record {

    public function setUp() {
        parent:: setUp();
        $this->hasOne('Formato', array('local' => 'idformato', 'foreign' => 'idformato'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.dat_parteformato');
        $this->hasColumn('idparteformato', 'numeric', null, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.dat_parteformato_idparteformato'));
        $this->hasColumn('parteformato', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('nivel', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('longitud', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idformato', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function getPartesFormato($idFormato) {
        $query = Doctrine_Query::create();
        $result = $query->select('pf.*')
            ->from('Parteformato pf')
            ->where("pf.idformato = $idFormato")
            ->orderby("pf.nivel")
            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
            ->execute();
        return $result;
    }


    public function buscarParteFormato($filter) {
        extract($filter);
        $where = (!$idparteformato) ? "(p.nombre = '$nombre' OR p.abreviatura = '$abreviatura' OR p.nivel = $nivel) AND p.idformato = $idformato" :
            "(p.nombre = '$nombre' OR p.abreviatura = '$abreviatura' OR p.nivel = $nivel) AND p.idformato = $idformato AND p.idparteformato <> $idparteformato";

        $query = Doctrine_Query::create();
        $data_result = $query->select('p.*')
            ->from('DatParteformato p')
            ->where($where)
            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
            ->execute();

        return (count($data_result)) ? 1 : 0;
    }


    public function buscarNivelFormato($filter) {
        extract($filter);
        $where = (!$idparteformato) ? "(p.nombre = '$nombre' OR p.abreviatura = '$abreviatura' OR p.nivel = $nivel) AND p.idformato = $idformato" :
            "(p.nombre = '$nombre' OR p.abreviatura = '$abreviatura' OR p.nivel = $nivel) AND p.idformato = $idformato AND p.idparteformato <> $idparteformato";

        $query = Doctrine_Query::create();
        $data_result = $query->select('p.*')
            ->from('DatParteformato p')
            ->where($where)
            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
            ->execute();

        return $data_result;
    }

}
