<?php

class RSA {

    private $PUBLIC_KEY;
    private $PRIVATE_KEY; //generated from MAC ADDRESS

    public function __construct() {
        $this->PUBLIC_KEY = $this->load_public_key();
        $this->PRIVATE_KEY = $this->load_private_key();
    }

    /**
     * Function for generating keys. Return array where
     * $array[0] -> modulo N
     * $array[1] -> public key E
     * $array[2] -> private key D
     * Public key pair is N and E
     * Private key pair is N and D
     */
    public function generate_keys($p, $q, $show_debug = 0) {
        $n = bcmul($p, $q);

        //m (we need it to calculate D and E) 
        $m = bcmul(bcsub($p, 1), bcsub($q, 1));

        // Public key  E 
        $e = $this->findE($m);

        // Private key D
        $d = $this->extend($e, $m);

        $keys = array($n, $e, $d);

        if ($show_debug) {
            echo "P = $p<br>Q = $q<br><strong>N = $n</strong> - modulo<br>M = $m<br><strong>E = $e</strong> - public key<br><strong>D = $d</strong> - private key<p>";
        }

        return $keys;
    }

    /**
     * Standard method of calculating D
     * D = E-1 (mod N)
     * It's presumed D will be found in less then 16 iterations 
     */
    private function extend($Ee, $Em) {
        $u1 = '1';
        $u2 = '0';
        $u3 = $Em;
        $v1 = '0';
        $v2 = '1';
        $v3 = $Ee;
        while (bccomp($v3, 0) != 0) {
            $qq = bcdiv($u3, $v3, 0);
            $t1 = bcsub($u1, bcmul($qq, $v1));
            $t2 = bcsub($u2, bcmul($qq, $v2));
            $t3 = bcsub($u3, bcmul($qq, $v3));
            $u1 = $v1;
            $u2 = $v2;
            $u3 = $v3;
            $v1 = $t1;
            $v2 = $t2;
            $v3 = $t3;
            $z = '1';
        }
        $uu = $u1;
        $vv = $u2;

        if (bccomp($vv, 0) == -1) {
            $inverse = bcadd($vv, $Em);
        } else {
            $inverse = $vv;
        }

        return $inverse;
    }

    /**
     * This function return Greatest Common Divisor for $e and $m numbers 
     */
    private function GCD($e, $m) {
        $y = $e;
        $x = $m;
        while (bccomp($y, 0) != 0) {
            // modulus function
            $w = bcsub($x, bcmul($y, bcdiv($x, $y, 0)));
            $x = $y;
            $y = $w;
        }
        return $x;
    }

    /**
     * Calculating E under conditions:
     * GCD(N,E) = 1 and 1<E<N
     */
    private function findE($m) {
        $e = '3';
        if (bccomp($this->GCD($e, $m), '1') != 0) {
            $e = '5';
            $step = '2';

            while (bccomp($this->GCD($e, $m), '1') != 0) {
                $e = bcadd($e, $step);

                if ($step == '2') {
                    $step = '4';
                } else {
                    $step = '2';
                }
            }
        }
        return $e;
    }

    /**
     * ENCRYPT function returns
     * X = M^E (mod N)
     *
     * @param string $m - Mensaje a encriptar.
     * @param string $e - Clave publica
     * @param string $n - Modulo
     * @param int $s Secciones en las que se desea dividir el mensaje durante el proceso de codificacion.
     * @return string , Mensaje encriptado
     */
    public function encrypt($m, $e, $n, $s = 3) {
        $coded = '';
        $max = strlen($m);
        $packets = ceil($max / $s);
        for ($i = 0; $i < $packets; $i++) {
            $packet = substr($m, $i * $s, $s);
            $code = '0';
            for ($j = 0; $j < $s; $j++) {
                if (!isset($packet[$j]))
                    $packet[$j] = '';
                $code = bcadd($code, bcmul(ord($packet[$j]), bcpow('256', $j)));
            }
            $code = bcpowmod($code, $e, $n);
            $coded .= $code . ' ';
        }
        return trim($coded);
    }

    /**
      ENCRYPT function returns
      M = X^D (mod N)
     */
    public function decrypt($c, $d, $n) {
        $coded = explode(' ', $c);
        $message = '';
        $max = count($coded);
        for ($i = 0; $i < $max; $i++) {
            $code = bcpowmod($coded[$i], $d, $n);

            while (bccomp($code, '0') != 0) {
                $ascii = bcmod($code, '256');
                $code = bcdiv($code, '256', 0);
                $message .= chr($ascii);
            }
        }
        return $message;
    }

    /**
     * Digital Signature
     * @param type $message
     * @param type $d
     * @param type $n
     * @return type 
     */
    public function sign($message, $d, $n) {
        $messageDigest = md5($message);
        $signature = $this->encrypt($messageDigest, $d, $n, 3);
        return $signature;
    }

    public function prove($message, $signature, $e, $n) {
        $messageDigest = $this->decrypt($signature, $e, $n);
        if ($messageDigest == md5($message)) {
            return true;
        } else {
            return false;
        }
    }

    public function signFile($file, $d, $n) {
        $messageDigest = md5_file($file);
        $signature = $this->encrypt($messageDigest, $d, $n, 3);
        return $signature;
    }

    public function proveFile($file, $signature, $e, $n) {
        $messageDigest = $this->decrypt($signature, $e, $n);
        if ($messageDigest == md5_file($file)) {
            return true;
        } else {
            return false;
        }
    }

    public function get_public_key() {
        return $this->PUBLIC_KEY;
    }

    public function get_private_key() {
        return $this->PRIVATE_KEY;
    }

    public function generate_private_Key() {
        $mac = $this->get_mac_address();
        $modify_mac = implode("", explode("-", $mac));
        $mac_formated = "";
        for ($i = 0; $i < strlen($modify_mac); $i++) {
            $mac_formated .=(!is_numeric($modify_mac[$i])) ? ord($modify_mac[$i]) : $modify_mac[$i];
        }
//        $mac_pryme = $this->do_pryme_number("999" . substr($mac_formated, 2, 7));
//        return $mac_pryme;
        return $mac_formated;
    }

    private function get_mac_address() {
        ob_start();
        //Get the ipconfig details using system commond  
        system('ipconfig /all');
        // Capture the output into a variable  
        $mycomsys = ob_get_contents();

        // Clean (erase) the output buffer  
        ob_clean();
        $find_mac = "Physical"; //find the "Physical" & Find the position of Physical text  
        $find_mac2 = "sica"; //find the "sica" & Find the position of sica text  (da bateo con los caracteres cuando esta en espannol)

        $pmac = strpos($mycomsys, $find_mac);
        if (!$pmac)
            $pmac = strpos($mycomsys, $find_mac2);

        // Get Physical Address  
//        $macaddress = substr($mycomsys, ($pmac + 36), 17);
        $macaddress = substr($mycomsys, ($pmac + 32), 17);
        //Display Mac Address  
        return $macaddress;
    }

    private function is_primo($num) {
        $cont = 0;
        for ($i = 2; $i <= $num; $i++) {
            if ($num % $i == 0) {
                if (++$cont > 1)
                    return false;
            }
        }
        return true;
    }

    private function do_pryme_number($number) {
        $num = round($number);
        if (!$this->is_primo($num)) {
            $num++;
            return $this->do_pryme_number($num);
        } else {
            return $num;
        }
    }

    private function load_public_key() {
        try {
            $fileKeys = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/keys.xml';
            if (file_exists($fileKeys)) {
                $xmlKeys = simplexml_load_file($fileKeys);
                $publiceKey = (string) $xmlKeys->publickey;
                return $publiceKey;
            } else {
                throw new Exception("The public key hasn't been able to get loaded. Please, contact your administrator.");
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function load_private_key() {
        try {
            $fileKeys = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/keys.xml';
            if (file_exists($fileKeys)) {
                $xmlKeys = simplexml_load_file($fileKeys);
                $privateKey = (string) $xmlKeys->privatekey;
                return $privateKey;
            } else {
                throw new Exception("The private key hasn't been able to get loaded. Please, contact your administrator.");
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function do_write_address() {
        $this->write_address();
    }

    private function write_address() {
        try {
            $fileKeys = $_SERVER['DOCUMENT_ROOT'] . "/comun/comun/xml/keys.xml";
            if (file_exists($fileKeys)) {
                $xmlKeys = simplexml_load_file($fileKeys);
                if (isset($xmlKeys)) {
                    $address = (string) $xmlKeys->address;
                    if (is_null($address) || $address <= 0) {
                        $privateKey = $this->generate_private_Key();
                        $xmlKeys->address = $privateKey;
                        $resultWrite = $xmlKeys->asXML($fileKeys);
                        if (!$resultWrite) {
                            throw new Exception("The system keys file hasn't been able to be written. Please, contact your administrator.");
                        }
                    }
                } else {
                    throw new Exception("The system keys file hasn't been able to get loaded. Please, contact your administrator.");
                }
            } else {
                throw new Exception("The private key hasn't been able to get loaded. Please, contact your administrator.");
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function do_rewrite_address() {
        $this->rewrite_address();
    }

    private function rewrite_address() {
        try {
            $fileKeys = $_SERVER['DOCUMENT_ROOT'] . "/comun/comun/xml/keys.xml";
            if (file_exists($fileKeys)) {
                $xmlKeys = simplexml_load_file($fileKeys);
                if (isset($xmlKeys)) {
                    $address = $xmlKeys->address;
                    $xmlKeys->address = round($address * 7 / 3);
                    $xmlKeys->asXML($fileKeys);
                } else {
                    throw new Exception("The system keys file hasn't been able to get loaded. Please, contact your administrator.");
                }
            } else {
                throw new Exception("The private key hasn't been able to get loaded. Please, contact your administrator.");
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function write_private_key($pk) {
        $fileKeys = $_SERVER['DOCUMENT_ROOT'] . "/comun/comun/xml/keys.xml";
        if (file_exists($fileKeys)) {
            $xmlKeys = simplexml_load_file($fileKeys);
            if ($xmlKeys != false) {
                throw new Exception("The system keys file hasn't been able to get loaded. Please, contact your administrator.");
            } else if (strlen((string) $xmlKeys->address)) {
                $xmlKeys->address = $pk;
                $resultWrite = $xmlKeys->asXML($fileKeys);
                if (!$resultWrite) {
                    throw new Exception("The system keys file hasn't been able to be written. Please, contact your administrator.");
                }
            }
        } else {
            throw new Exception("The private key hasn't been able to get loaded. Please, contact your administrator.");
        }
    }

}
