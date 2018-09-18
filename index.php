<?php

$INSTALL_DIRECTORY = $_SERVER['DOCUMENT_ROOT'] . "/app/web-install";
if (!file_exists($INSTALL_DIRECTORY)) {
    header("Location:app/index/index.php/index/index");
    exit();
} else {
    header("Location:app/web-install/index.php/install/install");
    exit();
}
