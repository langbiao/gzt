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
        if (isset($_POST['status']) && $status != -1) {
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
     * 打款
     */
    public function update()
    {
        $id = I('id');

        if (empty($id)) {
            $this->error('参数错误');
        }

        //默认显示添加表单
        if (!IS_POST) {
            $money_record = M('money_record', 'gzt_')->where(array('mr_id'=>$id))->find();
            $bank_info = M('bankinfo', 'gzt_')->where(array('b_id'=>$money_record['mr_bank_id']))->find();
            $user_info = M('users', 'gzt_')->where(array('u_uid'=>$money_record['mr_u_uid']))->getField('u_uid, u_mobile', true);
            $this->assign('money_record', $money_record);
            $this->assign('status_text', $this->status);
            $this->assign('bank_info', $bank_info);
            $this->assign('user_info', $user_info);
            $this->display();
        }
        if (IS_POST) {
            $status = I('mr_status');
            $reason = I('mr_reason');
            $money_record = M('money_record', 'gzt_')->where(array('mr_id'=>$id))->find();

            if (!in_array($status, array_keys($this->status)) || empty($money_record) || empty($status)) {
                $this->error('参数错误');
            }

            // 打款
            $data['mr_status'] = $status;
            $data['mr_reason'] = $reason;
            $data['mr_updatetime'] = time();

            M('money_record', 'gzt_')->where(array('mr_id'=>$id))->save($data);

            $this->success('更新成功', U('money/index'));

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
