<?php 
 class ChatModel extends ModelSecure
{
public function __construct()
 {
 parent::__construct(); 
}

	public function addChat($data) {
try {
$chat = new Chat();
$chat->idchat = $data->idchat;
$chat->chat = $data->chat;
$chat->save();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

public function modChat($data) {
try {
$chat = Doctrine_Core::getTable('Chat')->find($data->idchat);
$chat->chat = $data->chat;
$chat->save();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

public function delChat($id) {
try {
$chat = Doctrine_Core::getTable('Chat')->find($id);
$chat->delete();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

}
