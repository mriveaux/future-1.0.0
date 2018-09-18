<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Session.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Post.php');
$dataSession = Future_Session::getInstance();
$dataPost = Future_Post::getInstance();
$host = $dataPost->getServer('HTTP_HOST');
if (session_status() !== PHP_SESSION_ACTIVE) {
    header("HTTP/1.0 404 Not Found");
    header("Location: http://$host/comun/Security/Header/404.html");
    exit();
} else {
    if (isset($dataSession->lastAccess)) {
        $lastAccessed = $dataSession->lastAccess;
        $currentAccessed = $dataSession->currentAccess;
        $passedTime = (strtotime($currentAccessed) - strtotime($lastAccessed));
        $fileConfigSystem = $dr . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        $sessiontime = ($xmlConfigSystem != false) ? (int) $xmlConfigSystem->environment->sessiontime : 900;
        if ($passedTime >= $sessiontime) { //minutos * 60 seg e.g: 15min * 60seg = 900 segundos
            $dataSession->destroy();
            header("Location: http://$host/app/index/index.php/index/expired");
            exit();
        } else {
            $dataSession->lastAccess = date("Y-n-j H:i:s");
        }
    } else {
        $dataSession->lastAccess = date("Y-n-j H:i:s");
    }
}