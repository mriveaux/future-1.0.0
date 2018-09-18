<?php 
 class ChatController extends ControllerSecure 
{

private $chat;
private $chatModel;

public function __construct() {
 parent::__construct();
$this->chat = new Chat();
$this->chatModel = new ChatModel(); 
}
public function chatAction() {
$this->render('chat');
}
public function getchatAction(){
echo json_encode($this->chat->getChates());
}
public function addchatAction() {
echo json_encode($this->chatModel->addChat($this->dataPost));
}

public function modchatAction() {
echo json_encode($this->chatModel->modChat($this->dataPost));
}

public function delchatAction() {
echo json_encode($this->chatModel->delChat($this->dataPost));
}

}