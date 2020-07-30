// 昵称校验规则
$(function () {


    layui.form.verify({
        // 第一种写法
        nickname: function (value) {
            if (value.length >9) return '昵称不能超过6位';
        }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 第二种写法
        //     ,nickname: [
        //       /^[\S]{6,12}$/
        //       ,'密码必须6到12位，且不能出现空格'
        //     ] 
    });
    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layui.form.val('formUserInfo', res.data)

            }
        })
    }
// 重置表单/
$('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo()
})
// 修改用户信息功能

$('#myForm').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/my/userinfo',
        data:$('#myForm').serialize(),
        success:function(res){
           if(res.status!==0) {
               return layer.msg('修改用户信息失败')
           }
           layer.msg('修改用户信息成功');
           initUserInfo();//修改成功说明之前的信息是就的,我们调用这个拿到新的用户信息
        }
    })
})
})
