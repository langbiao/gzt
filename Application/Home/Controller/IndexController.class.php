<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    const domain = 'http://m.58gzt.com/';

    private $city = array ( 0 => array ( 'name' => '北京市', 'lib' => '3360', ), 1 => array ( 'name' => '天津市', 'lib' => '3362', ), 2 => array ( 'name' => '广州市', 'lib' => '326', ), 3 => array ( 'name' => '深圳市', 'lib' => '328', ), 4 => array ( 'name' => '上海市', 'lib' => '3361', ), 5 => array ( 'name' => '杭州市', 'lib' => '213', ), 6 => array ( 'name' => '西安市', 'lib' => '435', ), 7 => array ( 'name' => '南京市', 'lib' => '200', ), 8 => array ( 'name' => '惠州市', 'lib' => '336', ), 9 => array ( 'name' => '东莞市', 'lib' => '326', ), 10 => array ( 'name' => '武汉市', 'lib' => '295', ), 11 => array ( 'name' => '郑州市', 'lib' => '278', ), 12 => array ( 'name' => '成都市', 'lib' => '382', ), 13 => array ( 'name' => '青岛市', 'lib' => '262', ), 14 => array ( 'name' => '大连市', 'lib' => '165', ), );

    private $uid = null;

    public function __construct()
    {
        parent::__construct();
        $this->uid = $_SESSION['user']['u_uid'] ? $_SESSION['user']['u_uid'] : null;

    }

    /**
     * 活动首页
     */
    public function index()
    {
        $this->assign('current_menu', '/index/index');

        $this->display('Activity/index');

    }

    /**
     * 活动规则
     */
    public function rule()
    {
        $this->assign('current_menu', '/index/rule');
        $this->display('Activity/rule');

    }

    /**
     * 服务电话
     */
    public function service()
    {
        $this->assign('current_menu', '/index/service');
        $this->display('Activity/service');

    }

    /**
     * 登录
     */
    public function login()
    {
		$this->assign('show_footer', 'no');
        if ($_SESSION['user']['u_uid'] && $_SESSION['user']['u_uid'] == cookie('tj_id')) {
            $this->redirect('index/userhome');
        } else {
            $this->display('Activity/login');
        }

    }

    /**
     * 注册
     */
    public function reg()
    {
		$this->assign('show_footer', 'no');
        $icode = $_GET['icode'];
        if ($icode) {
            $this->assign('icode', $icode);
        }
        $this->display('Activity/reg');

    }

    /**
     * 协议
     */
    public function agreement()
    {
        $this->assign('current_menu', '/index/agreement');
        $this->display('Activity/agreement');

    }

    /**
     * 个人中心
     */
    public function userhome()
    {

        if ($this->uid) {
            $this->assign('current_menu', '/index/userhome');
            $this->display('Activity/userhome');
        } else {
            $this->redirect('index/login');
        }

    }

    /**
     * 个人信息
     */
    public function personalinfo()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/personalinfo');
        } else {
            $this->redirect('index/login');
        }
    }

    /**
     * 推荐列表
     */
    public function recommend()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/recommend');
        } else {
            $this->redirect('index/login');
        }

    }

    /**
     * 推荐详情
     */
    public function detail()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/detail');
        } else {
            $this->redirect('index/login');
        }
    }
	
	/**
     * 提现
     */
    public function distill()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/distill');
        } else {
            $this->redirect('index/login');
        }
    }
	
	/**
     * 银行卡列表
     */
    public function selectcard()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/selectcard');
        } else {
            $this->redirect('index/login');
        }

    }

    /**
     * 绑定银行卡
     */
    public function bindcard()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/bindcard');
        } else {
            $this->redirect('index/login');
        }

    }

    /**
     * 提现记录
     */
    public function moneyrecord()
    {
        if ($this->uid) {
            $this->assign('show_footer', 'no');
            $this->display('Activity/moneyrecord');
        } else {
            $this->redirect('index/login');
        }

    }

    /**
     * 拍照上传
     */
    public function upload()
    {

        $this->display('Activity/upload');

    }



    public function api()
    {
        if (!IS_POST) {
            $this->jsonReturn(400, [], 'Bad Method!');
        }

        $act = $_GET['act'];

        switch ($act) {
            case 'upload':
                echo 123;
                break;
            // 获取首页banner
            case 'banners':
                $a = [
                    0 => [
                        'img' =>  self::domain . '/Public/Activity/img/banner01.jpg',
                        'url' => '#'
                    ],
                    1 => [
                        'img' => self::domain . '/Public/Activity/img/banner02.jpg',
                        'url' => 'http://www.58gzt.com'
                    ]
                ];
                $this->jsonReturn(1, $a, 'success');
                break;
            // 获取案例
            case 'case':
                $a = [
                    0 => [
                        "id"=>"55",
                        "mobile"=>"158****4649",
                        "money"=>"200.00",
                        "header"=>self::domain . "/Public/Activity/img/case01.png"
                    ],
                    1 => [
                        "id"=>"56",
                        "mobile"=>"186****8522",
                        "money"=>"100.00",
                        "header"=>self::domain . "/Public/Activity/img/case02.png"
                    ],
                    2 => [
                        "id"=>"57",
                        "mobile"=>"136****1361",
                        "money"=>"300.00",
                        "header"=>self::domain . "/Public/Activity/img/case03.png"
                    ],
                    3 => [
                        "id"=>"55",
                        "mobile"=>"158****4649",
                        "money"=>"200.00",
                        "header"=>self::domain . "/Public/Activity/img/case04.png"
                    ],
                    4 => [
                        "id"=>"56",
                        "mobile"=>"186****8522",
                        "money"=>"100.00",
                        "header"=>self::domain . "/Public/Activity/img/case01.png"
                    ],
                    5 => [
                        "id"=>"57",
                        "mobile"=>"136****1361",
                        "money"=>"300.00",
                        "header"=>self::domain . "/Public/Activity/img/case02.png"
                    ],
                ];
                $this->jsonReturn(1, $a, 'success');
                break;
            // 获取次数
            case 'number':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $count = 10;
                } else {
                    $date = date('Y-m-d', time());
                    $count_info = M('recommend_count')->where(array('rc_u_uid'=>$uid, 'rc_date'=>$date))->find();
                    if (empty($count_info)) {
                        $data['rc_u_uid'] = $uid;
                        $data['rc_count'] = 10;
                        $data['rc_date'] = $date;
                        M('recommend_count')->add($data);
                        $count = 10;
                    } else {
                        $count = $count_info['rc_count'];
                    }
                }
                $this->jsonReturn(1, ['count'=>$count], 'success');
                break;
            // 获取城市信息
            case 'city':
                $a= $this->city;
                $this->jsonReturn(1, $a, 'success');
                break;
            // 保存推荐信息
            case 'send':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '请登录');
                }
                $data['r_u_uid'] = $uid;
                $data['r_username'] = $_POST['title'];
                $data['r_mobile'] = $_POST['mobile'];
                $data['r_sex'] = $_POST['sex'];
                $data['r_address'] = $_POST['areaid_2'];

                if ($_POST['address'] && $_POST['housecategory'] && $_POST['area'] && $_POST['budget']) {
                    $data['r_all'] = 1;
                    $data['r_community'] = $_POST['address'];
                    $data['r_new'] = $_POST['housecategory'];
                    $data['r_acreage'] = $_POST['area'];
                    $data['r_budget'] = $_POST['budget'];
                } else {
                    $data['r_all'] = 2;
                }

                $data['r_addtime'] = time();
                $data['r_status'] = 0;
                $data['r_reason'] = '等待审核';

                $flag = M('recommend')->add($data);
                if ($flag) {
                    $date = date('Y-m-d', time());
                    // 当天推荐次数减一
                    M('recommend_count')->where(array('rc_u_uid'=>$uid, 'rc_date'=>$date))->setDec('rc_count');
                    M('audit_log')->add(array('al_r_id'=>$flag, 'al_u_uid'=>$uid, 'al_title'=>'等待审核', 'al_reason'=>'', 'al_addtime'=>time()));
                }
                break;
            // 发送验证码
            case 'sendmsg':
                $mobile = $_POST['mobile'];
                $type = $_POST['type'] ? $_POST['type'] : 1;
                if (empty($mobile)) {
                    $this->jsonReturn(0, [], '请输入手机号');
                }
                if (!preg_match('/^1[3|4|5|7|8|9][0-9]\d{8}$/', $mobile)) {
                    $this->jsonReturn(0, [], '您输入的手机号格式不正确');
                }
                $user = M('users')->where(array('u_mobile'=>$mobile))->find();
                if ($type == 1) {
                    if ($user) {
                        $this->jsonReturn(0, [], '该手机号码已经注册');
                    }
                } else {
                    if (!$user) {
                        $this->jsonReturn(0, [], '不存在该手机号码');
                    }
                }

                // 生成验证码
                $smscode = $this->generateCode();

                // 发送验证码
                $flag = $this->sendMsg($smscode);

                if ($flag) {
                    $data['cap_opt'] = $type;
                    $data['cap_uid'] = 0;
                    $data['cap_to'] = $mobile;
                    $data['cap_code'] = $smscode;
                    $data['cap_ip'] = get_client_ip();
                    $data['cap_addtime'] = time();
                    M('captcha')->add($data);
                    $this->jsonReturn(1, ['code'=>$smscode], '发送验证码成功');
                } else {
                    $this->jsonReturn(0, [], '发送验证码失败');
                }
                break;
            // 登录
            case 'login':
                $mobile = $_POST['mobile'];
                $smscode = $_POST['smscode'];

                if (empty($mobile)) {
                    $this->jsonReturn(0, [], '请输入手机号');
                }
                if (!preg_match('/^1[3|4|5|7|8|9][0-9]\d{8}$/', $mobile)) {
                    $this->jsonReturn(0, [], '您输入的手机号格式不正确');
                }
                if (empty($smscode)) {
                    $this->jsonReturn(0, [], '请输入验证码');
                }

                $captchaData = M('captcha')->where(array('cap_to'=>$mobile, 'cap_opt'=>2, 'cap_code'=>$smscode))->order('cap_addtime desc')->find();

                if (empty($captchaData)) {
                    $this->jsonReturn(0, [], '验证码错误');
                }

                if ($captchaData['cap_status'] == 1) {
                    $this->jsonReturn(0, [], '验证码使用，重新获取');
                }

                if (time() - $captchaData['cap_addtime'] > 60) {
                    $this->jsonReturn(0, [], '验证码过期，重新获取');
                }

                $user = M('users')->where(array('u_mobile'=>$mobile, 'u_status'=>1))->find();

                if (empty($user)) {
                    $this->jsonReturn(0, [], '不存在该用户');
                }

                M('captcha')->where(array('cap_id'=>$captchaData['cap_id'], 'cap_opt'=>2))->save(array('cap_status'=>1));

                $_SESSION['user'] = $user;

                cookie('tj_id', $user['u_uid']);
                $this->jsonReturn(1, [], '登录成功');
                break;
            // 注册
            case 'reg':
                $mobile = $_POST['mobile'];
                $smscode = $_POST['smscode'];
                $rcode = $_POST['rcode'];

                if (empty($mobile)) {
                    $this->jsonReturn(0, [], '请输入手机号');
                }
                if (!preg_match('/^1[3|4|5|7|8|9][0-9]\d{8}$/', $mobile)) {
                    $this->jsonReturn(0, [], '您输入的手机号格式不正确');
                }
                if (empty($smscode)) {
                    $this->jsonReturn(0, [], '请输入验证码');
                }

                $user = M('users')->where(array('u_mobile'=>$mobile))->find();

                if ($user) {
                    $this->jsonReturn(0, [], '该手机号码已经注册');
                }

                $captchaData = M('captcha')->where(array('cap_to'=>$mobile, 'cap_opt'=>1, 'cap_code'=>$smscode))->order('cap_addtime desc')->find();

                if (empty($captchaData)) {
                    $this->jsonReturn(0, [], '验证码错误');
                }

                if ($captchaData['cap_status'] == 1) {
                    $this->jsonReturn(0, [], '验证码使用，重新获取');
                }

                if (time() - $captchaData['cap_addtime'] > 60) {
                    $this->jsonReturn(0, [], '验证码过期，重新获取');
                }

                if (!empty($rcode)) {
                    $is_exsist = M('users')->where(array('rcode'=>$rcode, 'u_status'=>1))->find();
                    if (empty($is_exsist)) {
                        $this->jsonReturn(0, [], '输入的邀请码不存在');
                    }
                }

                $invite_code = $this->generateInviteCode();

                if (empty($invite_code)) {
                    $this->jsonReturn(0, [], '生成邀请码失败');
                }

                $data['u_mobile'] = $mobile;
                $data['u_regtime'] = time();
                $data['u_regip'] = get_client_ip();
                $data['u_regtype'] = 3;
                $data['u_icode'] = $invite_code;

                $uid = M('users')->add($data);

                if ($uid) {
                    M('captcha')->where(array('cap_id'=>$captchaData['cap_id'], 'cap_opt'=>1))->save(array('cap_status'=>1));
                    $data['u_uid'] = $uid;
                    $_SESSION['user'] = $data;

                    // 保存邀请关系
                    if (!empty($rcode)) {
                        unset($data);
                        $data['ir_invite_code'] = $rcode;
                        $data['ir_binvite_code'] = $invite_code;
                        M('invite_relation')->add($data);
                    }
                    cookie('tj_id', $uid);
                    $this->jsonReturn(1, [], '注册成功');
                } else {
                    $this->jsonReturn(0, [], '注册失败');
                }

                break;
            // 获取个人信息
            case 'member':
            case 'personal':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }

                $user = M('users')->where(array('u_uid'=>$uid))->find();
                $a = [
                    'nickname'=>$user['u_mobile'],
                    'icode'=>$user['u_icode'],
                    'cumulative_money'=>sprintf('%.2f', $user['u_money']),
                    'avatar'=>self::domain . 'Public/Activity/img/default4.png',
                    'sex'=>$user['u_sex'],
                ];
                $this->jsonReturn(1, $a, '获取个人信息成功');
                break;
            case 'memberupdate';
                $uid = $_SESSION['user']['u_uid'];
                $sex = $_POST['sex'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                if (empty($sex)) {
                    $this->jsonReturn(0, [], '数据丢失');
                }
                M('users')->where(array('u_uid'=>$uid))->save(array('u_sex'=>$sex));
                $this->jsonReturn(1, [], '个人信息修改成功');
                break;
            // 获取推荐信息
            case 'recommend':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                $recommend_info = M('recommend')->where(array('r_u_uid'=>$uid))->order('r_addtime desc')->select();
                if (empty($recommend_info)) {
                    $this->jsonReturn(0, [], '没有推荐信息');
                }
                $a = [];
                foreach ($recommend_info as $value) {
                    $tmp = [
                        'nickname'=>$value['r_mobile'],
                        'status_reason'=>$value['r_reason'],
                        'status'=>$value['r_status'],
                        'orderid'=>$value['r_id'],
                        "title"=>$value['r_username'],
                        "area"=>$value['r_acreage'],
                        "areaid_2"=>$value['r_acreage'],
                        "address"=>$value['r_community'],
                        "city"=>$this->getCityName($value['r_address']),
                    ];
                    $a[] = $tmp;
                }
                $this->jsonReturn(1, $a, '获取个人推荐成功');
                break;
            // 获取推荐列表
            case 'recommendList':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                $recommend_info = M('recommend')->where(array('r_u_uid'=>$uid))->order('r_addtime desc')->select();
                if (empty($recommend_info)) {
                    $this->jsonReturn(0, [], '没有推荐信息');
                }
                $a = [];
                foreach ($recommend_info as $value) {
                    $tmp = [
                        'nickname'=>$value['r_mobile'],
                        'status_reason'=>$value['r_reason'],
                        'status'=>$value['r_status'],
                        'orderid'=>$value['r_id'],
                        "title"=>$value['r_username'],
                        "area"=>$value['r_acreage'],
                        "areaid_2"=>$value['r_acreage'],
                        "address"=>$value['r_community'],
                        "city"=>$this->getCityName($value['r_address']),
                    ];
                    $a[] = $tmp;
                }
                $this->jsonReturn(1, $a, '获取个人推荐列表成功');
                break;
            // 获取推荐详情
            case 'recommendDetail':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                $orderid = $_GET['orderid'];

                $recommend_info = M('recommend')->where(array('r_id'=>$orderid, 'r_u_uid'=>$uid))->find();
                if (empty($recommend_info)) {
                    $this->jsonReturn(0, [], '没有推荐信息');
                }
                
                $a = [
                    "uid"=>$uid,
                    "money"=>"100.00",
                    "mobile"=>$recommend_info['r_mobile'],
                    "sex"=>$recommend_info['r_sex'],
                    "avatar"=>self::domain . "Public/Activity/img/avatar.png",
                    "title"=>$recommend_info['r_username'],
                    "area"=>$recommend_info['r_acreage'],
                    "budget"=>$recommend_info['r_budget'],
                    "areaid_2"=>$recommend_info['r_acreage'],
                    "address"=>$recommend_info['r_community'],
                    "city"=>$this->getCityName($recommend_info['r_address']),
                ];
                $audit_info = M('audit_log')->where(array('al_r_id'=>$orderid, 'al_u_uid'=>$uid))->order('al_addtime asc')->select();
                foreach ($audit_info as $av) {
                    $tmp = [
                        "reason"=>$av['al_reason'],
                        "title"=>$av['al_title'],
                        "time"=>date('Y-m-d H:i:s', $av['al_addtime']),
                        "status"=>!empty($av['al_reason']) ? 1 : 0
                    ];
                    $a['status_reason'][] = $tmp;
                }
                $this->jsonReturn(1, $a, '获取推荐详情成功');
                break;
			// 获取二维码
            case 'qrcode':
                $uid = $_SESSION['user']['u_uid'];
                if (empty($uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                if (file_exists("./Public/QRcode/gztqrcode_{$uid}.png")) {
                    $img = self::domain . "./Public/QRcode/gztqrcode_{$uid}.png";
                } else {
                    $u_icode = M('users')->where(array('u_uid'=>$uid))->getField('u_icode');
                    $jump_url = self::domain . "gzt/index/reg.html?icode={$u_icode}";
                    $this->createQRcode('./Public/QRcode/', $uid, $jump_url);

                    $img = self::domain . "./Public/QRcode/gztqrcode_{$uid}.png";
                }
                $this->jsonReturn(1, ['qrcode'=>$img], '生成二维码成功');
                break;
			// 提取金额
			case 'domoney':
				$uid = $_SESSION['user']['u_uid'];
				$c_uid = cookie('tj_id');
				
				if (empty($uid) || empty($c_uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }

                $money = $_POST['money'];
                $bank_number = $_POST['bank_number'];
                $bank_name = $_POST['bank_name'];
                $bank_id = $_POST['bank_id'];

                if ($money <= 0 || empty($bank_id)) {
                    $this->jsonReturn(0, [], '提取失败');
                }

                $model = M('users');
                $user = $model->where(array('u_uid'=>$uid))->find();
                if ($user['u_money'] < $money) {
                    $this->jsonReturn(0, [], '提取金额有误');
                }

                $model->startTrans();
                // 余额减
                $flag1 = $model->where(array('u_uid'=>$uid))->setDec('u_money', $money);
                if (!$flag1) {
                    $model->rollback();
                    $this->jsonReturn(0, [], '提取失败');
                }
                // 添加提现记录
                unset($data);
                $data['mr_u_uid'] = $uid;
                $data['mr_money'] = $money;
                $data['mr_bank_id'] = $bank_id;
                $data['mr_bank_name'] = $bank_name;
                $data['mr_bank_number'] = $bank_number;
                $data['mr_status'] = 0;
                $data['mr_addtime'] = time();

                $flag2 = M('money_record')->add($data);

                if (!$flag2) {
                    $model->rollback();
                    $this->jsonReturn(0, [], '提取失败');
                }

                $model->commit();

				$this->jsonReturn(1, [], '提取成功');
                break;
			// 获取金额
			case 'getmoney':
				$uid = $_SESSION['user']['u_uid'];
				$c_uid = cookie('tj_id');
				$bid = $_POST['bid'];
				if (empty($uid) || empty($c_uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                $bankinfo = [];

                if ($bid) {
                    $bankinfo = M('bankinfo')->where(array('b_id'=>$bid, 'b_u_uid'=>$uid, 'b_status'=>1))->find();
                }

                $user = M('users')->where(array('u_uid'=>$uid))->find();

                // 历史提现金额
                $his_money = M('money_record')->where(array('mr_u_uid'=>$uid, 'mr_status'=>1))->getField('SUM(mr_money)');

				$a['bank_id'] = $bankinfo['b_id'];
				$a['bank_name'] = $bankinfo['b_bank_name'];
				$a['bank_number'] = $bankinfo['b_bank_number'];
				$a['bank_str'] = $bankinfo['b_bank_number'] ? $bankinfo['b_bank_name'] . '(尾号' .substr($bankinfo['b_bank_number'], -4) . ')' : '';
				$a['cumulative_money'] = $user['u_money'] ? sprintf('%.2f', $user['u_money']) : 0.00;
				$a['extract_money'] = sprintf('%.2f', $his_money);
				$a['status'] = $bankinfo['b_bank_number'] ? 1 : 0;
				
				$this->jsonReturn(1, $a, '获取成功');
                break;
            // 选择银行卡
            case 'selectcard':
                $uid = $_SESSION['user']['u_uid'];
                $c_uid = cookie('tj_id');
                if (empty($uid) || empty($c_uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                $bankinfo = M('bankinfo')->where(array('b_u_uid'=>$uid, 'b_status'=>1))->select();
                $a = [];
                foreach ($bankinfo as $value) {
                    $tmp['id'] = $value['b_id'];
                    $tmp['bank_name'] = $value['b_bank_name'];
                    $tmp['bank_number'] = $value['b_bank_number'];
                    $tmp['branch'] = $value['b_bank_branch'];
                    $tmp['name'] = $value['b_user_name'];
                    $a[] = $tmp;
                }
                $this->jsonReturn(1, $a, '获取成功');
                break;
            // 添加银行卡
            case 'addcard':
                $uid = $_SESSION['user']['u_uid'];
                $c_uid = cookie('tj_id');
                if (empty($uid) || empty($c_uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }

                $count = M('bankinfo')->where(array('b_u_uid'=>$uid, 'b_status'=>1))->count();

                if ($count >= 3) {
                    $this->jsonReturn(0, [], '最多可绑定3张银行卡');
                }

                $data['b_u_uid'] = $uid;
                $data['b_user_name'] = $_POST['name'];
                $data['b_bank_name'] = $_POST['bank_name'];
                $data['b_bank_number'] = $_POST['bank_number'];
                $data['b_idcard'] = $_POST['id_number'];
                $data['b_bank_branch'] = $_POST['branch'];
                $data['b_addtime'] = time();

                M('bankinfo')->add($data);

                $this->jsonReturn(1, [], '添加成功');
                break;
            // 提现记录
            case 'moneyrecord':
                $uid = $_SESSION['user']['u_uid'];
                $c_uid = cookie('tj_id');
                if (empty($uid) || empty($c_uid)) {
                    $this->jsonReturn(0, [], '未登录');
                }
                $record = M('money_record')->where(array('mr_u_uid'=>$uid))->order('mr_id desc')->select();
                $a = [];
                foreach ($record as $value) {
                    $tmp['addtime'] = date('Y-m-d H:i:s', $value['mr_addtime']);
                    $tmp['money'] = $value['mr_money'];
                    $tmp['bank_number'] = $value['mr_bank_number'];
                    $tmp['bank_name'] = $value['mr_bank_name'];
                    $tmp['status'] = $value['mr_status'];
                    $tmp['remark'] = $value['mr_reason'];
                    $a[] = $tmp;
                }
                $this->jsonReturn(1, $a, '获取成功');
                break;
            case 'logout':
                cookie('tj_id', null);
                unset($_SESSION['user']);
                $this->jsonReturn(1, [], '退出成功');
                break;
            default:
                $this->jsonReturn(403, [], 'Bad Requset!');
                break;
        }
    }

    /**
     * 生成验证码
     *
     * @param int $length
     * @return string
     */
    private function generateCode($length = 4) {
        return str_pad(mt_rand(0, pow(10, $length) - 1), $length, '0', STR_PAD_LEFT);
    }

    /**
     * 生成邀请码
     *
     * @param integer $code_length
     * @return string
     */
    private function generateInviteCode($code_length = 6) {
        $characters = "0123456789";
        $code = "";
        $i = 0;
        while (true) {
            $code = "";
            if ($i > 5) {
                break;
            }
            $i ++;
            for ($i = 0; $i < $code_length; $i++) {
                $code .= $characters[mt_rand(0, strlen($characters) - 1)];
            }
            $ic_id = M('invite_code')->where(array('ic_code'=>$code))->getField('ic_id');
            if (empty($ic_id)) {
                M('invite_code')->add(array('ic_code'=>$code));
                break;
            }
        }

        return $code;
    }

    private function sendMsg($smscode)
    {
        return true;
    }

    private function jsonReturn($code = 0, $data = [], $message = '')
    {
        $return = [
            'code'=>$code,
            'data'=>$data,
            'message'=>$message,
            'process_time'=>time(),
        ];

        echo json_encode($return);
        exit();
    }

    private function getCityName($city)
    {
        $city_name = '';
        foreach ($this->city as $v) {
            if ($v['lib'] == $city) {
                $city_name = $v['name'];
                break;
            }
        }
        return $city_name;
    }

    /**
     * 功能：生成二维码
     * @param string $qr_data   手机扫描后要跳转的网址
     * @param string $uid  自定义文件名称
     * @param string $qr_level  默认纠错比例 分为L、M、Q、H四个等级，H代表最高纠错能力
     * @param integer $qr_size   二维码图大小，1－10可选，数字越大图片尺寸越大
     * @param string $save_path 图片存储路径
     * @param string $save_prefix 图片名称前缀
     *
     * @return mixed
     */
    private function createQRcode($save_path,$uid ='',$qr_data='http://www.58gzt.com',$qr_level='L',$qr_size=4,$save_prefix='gztqrcode_'){
        if(!isset($save_path)) return '';
        //设置生成png图片的路径
        $PNG_TEMP_DIR = & $save_path;
        //导入二维码核心程序
        vendor('PHPQRcode.phpqrcode#class');  //注意这里的大小写哦，不然会出现找不到类，PHPQRcode是文件夹名字，class#phpqrcode就代表class.phpqrcode.php文件名
        //检测并创建生成文件夹
        if (!file_exists($PNG_TEMP_DIR)){
            mkdir($PNG_TEMP_DIR);
        }
        $filename = $PNG_TEMP_DIR.'test.png';
        $errorCorrectionLevel = 'L';
        if (isset($qr_level) && in_array($qr_level, array('L','M','Q','H'))){
            $errorCorrectionLevel = & $qr_level;
        }
        $matrixPointSize = 4;
        if (isset($qr_size)){
            $matrixPointSize = & min(max((int)$qr_size, 1), 10);
        }
        if (isset($qr_data)) {
            if (trim($qr_data) == ''){
                die('data cannot be empty!');
            }
            //生成文件名 文件路径+图片名字前缀+md5(名称)+.png
            $filename = $PNG_TEMP_DIR.$save_prefix.$uid.'.png';
            //开始生成
            \QRcode::png($qr_data, $filename, $errorCorrectionLevel, $matrixPointSize, 2);
        } else {
            //默认生成
            \QRcode::png('PHP QR Code :)', $filename, $errorCorrectionLevel, $matrixPointSize, 2);
        }
        if(file_exists($PNG_TEMP_DIR.basename($filename)))
            return basename($filename);
        else
            return FALSE;
    }


    public function test()
    {

        $demo = new \Extend\AliSms(
            "yourAccessKeyId",
            "yourAccessKeySecret"
        );

        echo "SmsDemo::sendSms\n";
        $response = $demo->sendSms(
            "短信签名", // 短信签名
            "SMS_0000001", // 短信模板编号
            "12345678901", // 短信接收者
            Array(  // 短信模板中字段的值
                "code"=>"12345",
                "product"=>"dsd"
            ),
            "123"
        );
        dump($response);

//        echo "SmsDemo::queryDetails\n";
//        $response = $demo->queryDetails(
//            "12345678901",  // phoneNumbers 电话号码
//            "20170718", // sendDate 发送时间
//            10, // pageSize 分页大小
//            1 // currentPage 当前页码
//        // "abcd" // bizId 短信发送流水号，选填
//        );
//
//        print_r($response);
    }

}