<?php
return array(

    'URL_MODEL'=>'2',
    'URL_CASE_INSENSITIVE'=>'1',
    'LOAD_EXT_FILE'=>'function',

    'SHOW_PAGE_TRACE'=>false,

    /* 数据库设置 */
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  '127.0.0.1', // 服务器地址
    'DB_NAME'               =>  'gzt',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  '',          // 密码
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  'gzt_',    // 数据库表前缀

    'TMPL_ACTION_SUCCESS'=>'Public:exception',
    'TMPL_ACTION_ERROR'=>'Public:exception',
    'TMPL_EXCEPTION_FILE'   =>  'Public:exception',// 异常页面的模板文件
);