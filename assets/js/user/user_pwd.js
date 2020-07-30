layui.form.verify({
    pwd: [/^\S{6,12}$/, '密码长度必须在6~12位!'],
    repwd: function (value) {
        var pwd = $('[name=newPwd]').val();
        if (pwd !== value) return '密码不一致'
    }
})
$('#myForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: $('#myForm').serialize(),
        success: function (res) {
            console.log(res);
            localStorage.removeItem('token');
            window.parent.location.href = '/login.html'
        }
    })
})