$(function () {
    // 登录按钮绑定事件
    $('#link_reg,#link_login').on('click', function () {
        $(this).parents('form').hide().siblings('form').show();
    });
    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^\S{6,12}$/, '密码不能为空,且必须6到12位'],
        repwd: function (value) {
            var pwd = $('#reg_form [name="password"]').val();

            console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    // 获取数据
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#reg_form [name="username"]').val();
        var password = $('#reg_form [name="password"]').val();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: username,
                password: password,
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
            }
        });
    });
$('#login_form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        type:'post',
        url:'/api/login',
        data:$('#login_form').serialize(),
        success:function(res){
            console.log(res);
            if(res.status!==0)
            {
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            localStorage.setItem('token',res.token);
            location.href='/index.html';
        }
    })
})
});

