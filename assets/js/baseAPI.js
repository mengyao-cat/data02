$(function(){
  $.ajaxPrefilter(function(option){
    // if(option.url.startWith('/my/')){
    //  option.headers={
    //   Authorization: localStorage.getItem('token') || ''
    //  }
    // } ;或者
    if(option.url.indexOf('/my/')!==-1){
      option.headers={
       Authorization: localStorage.getItem('token') || ''
      }
    }  
    option.url='http://ajax.frontend.itheima.net'+option.url;
  });
});