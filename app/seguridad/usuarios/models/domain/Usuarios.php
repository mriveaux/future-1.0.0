<?php

class Usuarios extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('seguridad.usuarios');
        $this->hasColumn('idusuario', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'seguridad.usuarios_idusuario'));
        $this->hasColumn('usuario', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('apellidos', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idgruporoles', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('password', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('cargo', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('rangoip', 'character varying', 18, array('notnull' => true, 'primary' => false));
        $this->hasColumn('perfil', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tema', 'numeric', 2, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idioma', 'numeric', 2, array('notnull' => false, 'primary' => false));
        $this->hasColumn('espaciotrabajo', 'numeric', 2, array('notnull' => false, 'primary' => false));
        $this->hasColumn('email', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('estado', 'numeric', 1, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('GrupoRoles', array('local' => 'idgruporoles', 'foreign' => 'idgruporoles'));
        $this->hasOne('Trabajador', array('local' => 'perfil', 'foreign' => 'idtrabajador'));
    }

    public function cargarUsuarios($argRequest) {
        try {
            $start = isset($argRequest->start) ? $argRequest->start : 0;
            $limit = isset($argRequest->limit) ? $argRequest->limit : 20;
            $cadena = isset($argRequest->cadena) ? $argRequest->cadena : '';
            $SELECT = "u.idusuario,u.usuario,u.nombre,u.apellidos,u.idgruporoles,u.cargo,u.estado,u.rangoip,r.nombre,u.perfil,u.identidad,u.tema,u.idioma,u.espaciotrabajo,u.email, t.*";

            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select($SELECT)
                    ->from('Usuarios u')
                    ->innerJoin('u.GrupoRoles r')
                    ->leftJoin('u.Trabajador t')
                    ->offset($start)
                    ->limit($limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);

            $queryCount->from('Usuarios')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);

            if ($cadena != '') {
                $query->addWhere("u.usuario ilike '%" . $cadena . "%' OR u.nombre ilike '%" . $cadena . "%' OR u.apellidos ilike '%" . $cadena . "%'");
                $queryCount->addWhere("usuario ilike '%" . $cadena . "%' OR nombre ilike '%" . $cadena . "%' OR apellidos ilike '%" . $cadena . "%'");
            }

            $query->addOrderBy('u.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();

            $resp = array();
            foreach ($result as $value) {
                $val = new stdClass();
                $val->idusuario = $value['idusuario'];
                $val->usuario = $value['usuario'];
                $val->nombre = $value['nombre'];
                $val->apellidos = $value['apellidos'];
                $val->idgruporoles = $value['idgruporoles'];
                $val->cargo = $value['cargo'];
                $val->estado = $value['estado'];
                $val->email = $value['email'];
                $val->rangoip = $value['rangoip'];
                $val->nombreGrupoRol = $value['GrupoRoles']['nombre'];
                $val->perfil = $value['perfil'];
                $val->tema = $value['tema'];
                $val->idioma = $value['idioma'];
                $val->espaciotrabajo = $value['espaciotrabajo'];
                $val->identidad = $value['identidad'];
                $val->base64img = $value['Trabajador']['foto'];
                $val->dataperfil = ($value['Trabajador']) ? $value['Trabajador']['nombre'] . ' ' . $value['Trabajador']['apellidos'] : 'Sin perfil';
                $resp[] = $val;
            }
            return array('campos' => $resp, 'totalrecords' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarIdUsuario($user) {
        try {
            $whereuser = "u.usuario='$user'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.idusuario')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return $result[0]['idusuario'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarUsuarioExistente($usuario) {
        try {
            $whereuser = "u.usuario='$usuario'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.idusuario')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function verificardatosuser($usuario, $password, $useLdap) {
        try {
            $whereuser = "u.usuario='$usuario'";
            $wherepass = "u.password='$password'";
            $user = $pass = false;
            $query = Doctrine_Query::create();
            $query_user = $query->select('*')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            if (count($query_user) > 0) {
                $user = true;
            }

            if ($useLdap == false) {
                $query1 = Doctrine_Query::create();
                $query_pass = $query1->select('*')
                        ->from('Usuarios u')
                        ->where($whereuser . ' AND ' . $wherepass)
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                        ->execute();
                if (count($query_pass) > 0) {
                    $pass = true;
                }
            } else
                $pass = true;

            return ($user && $pass) ? true : false;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function dameIdRoles($user) {
        try {
            $whereuser = "u.usuario='$user'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.idgruporoles')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return $result[0]['idgruporoles'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function dameIdUsuario($user) {
        try {
            $whereuser = "u.usuario='$user'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.idusuario')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return $result[0]['idusuario'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function dameNombreUsuario($user) {
        try {
            $whereuser = "u.idusuario='$user'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.*')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            return $result[0]['nombre'] . ' ' . $result[0]['apellidos'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function verificarIP($user, Future_Post $post) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('u.rangoip')->from('Usuarios u')
                            ->where("u.usuario = ?", $user)
                            ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD)->execute();
            $ipacceso = $post->getIPClient();
            return $this->ip_in_range($ipacceso, $result->getFirst()->rangoip);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function convertirBaseTres($arrayNum) {
        try {
            foreach ($arrayNum as &$n) {
                while (strlen($n) < 3) {
                    $n = '0' . $n;
                }
            }
            return $arrayNum;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function verificarUsuarioActivo($user) {
        try {
            $whereuser = "u.usuario='$user'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.estado')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return ($result[0]['estado'] == 0 || $result[0]['estado'] == 2) ? false : true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function cargardatosuser($user) {
        try {
            $query = Doctrine_Query::create();
            $whereuser = "u.usuario='$user'";
            $result = $query->select('*')
                    ->from('Usuarios u')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function cargarUsuariosService() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('u.*, r.*')
                    ->from('Usuarios u')
                    ->innerJoin('u.GrupoRoles r')
                    ->orderby('u.usuario')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            return array('campos' => $result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAllDataUsuario($user) {
        try {
            $whereuser = "u.idusuario='$user'";
            $query = Doctrine_Query::create();
            $result = $query->select('u.*, r.*,t.*')
                    ->from('Usuarios u')
                    ->innerJoin('u.GrupoRoles r')
                    ->leftJoin('u.Trabajador t')
                    ->where($whereuser)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            $data = new stdClass();
            $data->id = $result[0]['idusuario'];
            $data->usuario = $result[0]['usuario'];
            $data->apellidos = $result[0]['apellidos'];
            $data->nombre = $result[0]['nombre'];
            $data->cargo = ($result[0]['Trabajador']) ? $result[0]['Trabajador']['ocupacion'] : $result[0]['cargo'];
            $data->gruporoles = $result[0]['GrupoRoles']['nombre'];
            $data->perfil = $result[0]['perfil'];
            $data->tema = $result[0]['tema'];
            $data->idioma = $result[0]['idioma'];
            $data->espaciotrabajo = $result[0]['espaciotrabajo'];
            $data->email = $result[0]['email'];
            $data->base64img = $result[0]['Trabajador']['foto'];
//            $data->nameperfil = ($result[0]['Trabajador']) ? $result[0]['Trabajador']['nombre'] . ' ' . $result[0]['Trabajador']['apellidos'] : 'Sin perfil';
            $data->nameperfil = ($result[0]['Trabajador']) ? $result[0]['Trabajador']['nombre'] . ' ' . $result[0]['Trabajador']['apellidos'] : $result[0]['nombre'] . ' ' . $result[0]['apellidos'];
            $data->dataperfil = $result[0]['Trabajador'];

            return $data;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function setCookieUserById($idUser) {
        try {
            mt_srand(time());
            $numberRandom = mt_rand(1000000, 999999999);
            $sql = "UPDATE seguridad.usuarios SET cookie = $numberRandom WHERE idusuario = $idUser;";
            Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            //session_name($idUser . '_cmi_perdurit');
            //cambiamos la duracion a la cookie de la sesion
            session_set_cookie_params(0, "/", $_SERVER["HTTP_HOST"], 0);
            setcookie("userid_cmi_perdurit", $idUser, time() + (60 * 60 * 24 * 365));
            setcookie("random_cmi_perdurit", $numberRandom, time() + (60 * 60 * 24 * 365));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Check if a given ip is in a network
     * @param  string $ip    IP to check in IPV4 format eg. 127.0.0.1
     * @param  string $range IP/CIDR netmask eg. 127.0.0.0/24, also 127.0.0.1 is accepted and /32 assumed
     * @return boolean true if the ip is in this range / false if not.
     */
    function ip_in_range($ip, $range) {
        if (strpos($range, '/') == false) {
            $range .= '/32';
        }
        // $range is in IP/CIDR format eg 127.0.0.1/24
        list( $range, $netmask ) = explode('/', $range, 2);
        $range_decimal = ip2long($range);
        $ip_decimal = ip2long($ip);
        $wildcard_decimal = pow(2, ( 32 - $netmask)) - 1;
        $netmask_decimal = ~ $wildcard_decimal;
        return ( ( $ip_decimal & $netmask_decimal ) == ( $range_decimal & $netmask_decimal ) );
    }

}
