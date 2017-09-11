<?php
namespace Admin\Controller;
use Admin\Controller;
/**
 * 推荐管理
 */
class MoneyController extends BaseController
{
    private $status = [
        0=>'未打款',
        1=>'已打款',
        2=>'驳回'
    ];

    /**
     * 打款列表
     * @return [type] [description]
     */
    public function index()
    {
        $status = I('status');
        $key = I('key');

        $model = M('money_record', 'gzt_');

        if($key){
            $where['mr_bank_name'] = array('like',"%$key%");
            $model = $model->where($where);
        }
        if ($status != -1) {
            $where['mr_status'] = $status;
            $model = $model->where($where);
        }

        $count  = $model->order('mr_id desc')->count();// 查询满足要求的总记录数
        $Page = new \Extend\Page($count,15);// 实例化分页类 传入总记录数和每页显示的记录数(25)
        $show = $Page->show();// 分页显示输出
        $money_record = $model->limit($Page->firstRow.','.$Page->listRows)->where($where)->order('mr_id desc')->select();

        $uids = array_column($money_record, 'mr_u_uid');

        $user_info = M('users', 'gzt_')->where(array('u_uid'=>array('in', $uids)))->getField('u_uid, u_mobile', true);

        $this->assign('money_record', $money_record);
        $this->assign('user_info', $user_info);
        $this->assign('status_text', $this->status);
        $this->assign('page',$show);
        $this->display();     
    }

    /**
     * 更新
     */
    public function update()
    {
        $id = I('id');
        //默认显示添加表单
        if (!IS_POST) {
            $recommend = M('recommend', 'gzt_')->where(array('r_id'=>$id))->find();
            $this->assign('model',$recommend);
            $this->assign('status_text', $this->status);
            $this->assign('see', I('see'));
            $this->display();
        }
        if (IS_POST) {
            $status = I('r_status');
            $reason = I('r_reason');
            $recommend = M('recommend', 'gzt_')->where(array('r_id'=>$id))->find();

            if (empty($recommend) || $recommend['r_status'] >=3) {
                $this->error('参数错误');
            }

            $data['r_status'] = $status;

            // 量房成功
            if ($status == 3) {
                $users = M('users', 'gzt_')->where(array('u_uid'=>$recommend['r_u_uid']))->find();
                // 查找我的推荐
                $invite = M('invite_relation', 'gzt_')->where(array('ir_binvite_code'=>$users['u_icode']))->getField('ir_invite_code', true);
                // 推荐人金额加100
                $flag1 = M('users', 'gzt_')->where(array('u_uid'=>$recommend['r_u_uid']))->setInc('u_money', 100);
                
                if (!$flag1) {
                    $this->error('更新失败');
                }
                if (!empty($invite)) {
                    $flag2 = M('users', 'gzt_')->where(array('u_uid'=>array('in', $invite)))->setInc('u_money', 50);
                    if (!$flag2) {
                        $this->error('更新失败');
                    }
                }
            }

            // 记录日志
            $d_log['al_r_id'] = $recommend['r_id'];
            $d_log['al_u_uid'] = $recommend['r_u_uid'];
            $d_log['al_title'] = $this->status[$status];
            $d_log['al_reason'] = $reason;
            $d_log['al_addtime'] = time();
            M('audit_log', 'gzt_')->add($d_log);

            // 更新推荐状态
            $t_data['r_status'] = $status;
            $t_data['r_reason'] = $this->status[$status];
            M('recommend', 'gzt_')->where(array('r_id'=>$id))->save($t_data);

            $this->success('更新成功');

        }
    }

    /**
     * 删除
     */
    public function delete($id)
    {
    	$id = intval($id);
    	if (empty($id)) {
            $this->error("删除失败");
        }
        $model = M('recommend', 'gzt_');

        $result = $model->where(array('r_id'=>$id))->delete();

        $this->success("删除成功", U('recommend/index'));
    }
}
