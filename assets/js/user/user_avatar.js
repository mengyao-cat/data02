// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}
var layer = layui.layer;
// 1.3 创建裁剪区域
$image.cropper(options)

// 当点击上传按钮的时候,用js 来模拟点击input:file文件上传按钮
$('#btn').on('click', function () {
  
  $('#file').click();
})
$('#file').on('change', function () {
  var file = this.files[0];
  console.log(file);
  console.log(this.files);
  if (this.files.length <= 0) return layer.msg('请选择文件');
  var newImgURL = URL.createObjectURL(file);
  $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
})
$('#btnUpload').on('click', function () {
  var dataURL = $image
    .cropper('getCroppedCanvas', {
      width: 100,
      heigth: 100
    })
    .toDataURL('image/png')
  $.ajax({
    type: 'post',
    url: '/my/update/avatar',
    data: dataURL,
    success: function (res) {
      console.log(res)
      if (res.status !== 0) return layer.msg('更换头像失败')
      window.parent.getUserInfo();
    }
  })
})