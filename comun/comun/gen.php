<?php

$include = 'librerias/Doctrine/Doctrine.php';
include ($include);
spl_autoload_register(array('Doctrine', 'autoload'));

$conn = Doctrine_Manager::connection('pgsql://postgres:postgres@localhost/chat_job');
Doctrine::generateModelsFromDb('modelos');
