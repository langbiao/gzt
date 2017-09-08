<?php
namespace Admin\Controller;
use Admin\Controller;

class IndexController extends BaseController{

    public function index(){
        $this->display();
    }
    
    //设置
    public function setting()
    {
        if (IS_POST) {
            $this->setePassword();
        }
        $this->display();
    }
    
    //修改密码
    public function setePassword()
    {
        $pw1 = I('password_new1');
        $pw2 = I('password_new2');
        
        if(empty($pw1) || empty($pw2)){
            $this->error('密码不能为空');
        }
        if($pw1 != $pw1){
            $this->error('两次密码输入不一致');
        }
        
        $adminId = session('adminId');
        
        $flag = M('member', 'gztadmin_')->where(array('id'=>$adminId))->save(array('password'=>md5($pw1)));
        
        if(false !== $flag) {
            $this->success('修改成功');
        }else{
            $this->success('修改失败，请重试');
        }
        
        
    }
}
