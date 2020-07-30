$(function () {
    // 调用这个函数 获取用户信息
    getUserInfo()
    // 退出功能 绑定点击事件
    $('#logout').on('click', function () {
        console.log(112);
        //eg1
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 销毁凭证
            localStorage.removeItem('token');
            // 跳转到登录
            location.href = '/login.html'
            layer.close(index);
        });
    })
    // 创建一个函数
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败');
                }

                // 如果有昵称就用昵称,否则用用户名
                if (res.data.nickname == '') {
                    // return layui.layer.msg(res.message)
                    $('.userinfo .username').html(res.data.username);
                } else {
                    // 用昵称
                    $('.userinfo .username').html(res.data.nickname);
                }
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();

                } else {
                    $('.text-avatar').html(res.data.username[0].toUpperCase()).show();

                }

                // renderAvatar(res.data);  
            },
            complete: function (res) {
                // 登录拦截log
                console.log(111);
                if (res.responseJSON.status === 1) {
                    console.log(222);
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
            }
        })
    }


})
