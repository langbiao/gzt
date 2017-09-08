<?php
namespace Admin\Controller;
use Admin\Controller;

class IndexController extends BaseController{

    public function index(){
        $this->display();
    }
    
    //修改密码
    public function setting()
    {
        if (IS_POST) {
            $this->setePassword();
        }
        $this->display();
    }
}
