<?php

class Acciones extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('configuracion.dat_accion');
        $this->hasColumn('idaccion', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'configuracion.dat_accion_idaccion'));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idrecurso', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function loadDataAcciones($post) {
        try {
            $classMethods = $this->getClassMethods($post->src);
            if (count($classMethods)) {
                $dbActions = $this->loadAcciones($post);
                if (count($dbActions)) {
                    return array('data' => $this->makeFussion($classMethods, $dbActions));
                } else {
                    return array('data' => $classMethods);
                }
            } else {
                return array('data' => array());
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function makeFussion($argClassMethods, $actions) {
        foreach ($argClassMethods as &$method) {
            foreach ($actions as $v) {
                if ($v['nombre'] == $method->nombre) {
                    $method->idaccion = $v['idaccion'];
                    $method->idrecurso = $v['idrecurso'];
                    $method->asociado = true;
                }
            }
        }
        return $argClassMethods;
    }

    private function loadAcciones($post) {
        try {
            $query = Doctrine_Query::create();
            $idrecurso = $post->idrecurso;
            $query->from('Acciones a')->where("a.idrecurso = $idrecurso")->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getClassMethods($src) {
        try {
            $route = explode('index.php', $src);
            $arr_methods = array();

            $prefijo_control = 'Controller';
            $ca = '/^\/([a-z]+\w)\/([a-z]+)$/';              // /controller/action
            $matches = array();
            if (preg_match($ca, $route[1], $matches)) {
                $classname = $matches[1] . $prefijo_control;
            }

            if (isset($classname)) {
                $dir = $_SERVER['DOCUMENT_ROOT'] . $route[0] . 'controllers/' . $classname . '.php';
                if (file_exists($dir)) {
                    require_once($dir);
                    if (class_exists($classname)) {
                        $class_methods = get_class_methods($classname);
                        if (count($class_methods)) {
                            foreach ($class_methods as $v) {
                                if (strstr($v, 'Action')) {
                                    $a = new stdClass();
                                    $a->idaccion = null;
                                    $a->idrecurso = null;
                                    $a->asociado = false;
                                    $a->nombre = $v;
                                    $arr_methods[] = $a;
                                }
                            }
                            return $arr_methods;
                        } else {
                            return array();
                        }
                    } else {
                        return array();
                    }
                } else {
                    return array();
                }
            } else {
                return array();
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deleteActionsAssociation($argIdRecurso) {
        try {
            $objAcciones = Doctrine_Core::getTable('Acciones')->findBy('idrecurso', $argIdRecurso);
            $objAcciones->delete();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
