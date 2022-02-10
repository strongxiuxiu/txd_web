
    function member_show(title,url,id,w,h){
        x_admin_show(title,url,w,h);
      }
    //   顶部时间
    function getTime(){
        var myDate = new Date();
        var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var myMonth = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
        var myToday = myDate.getDate(); //获取当前日(1-31)
        var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        var myHour = myDate.getHours(); //获取当前小时数(0-23)
        var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
        var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
        var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        var nowTime;

        nowTime = myYear+'-'+fillZero(myMonth)+'-'+fillZero(myToday)+'&nbsp;&nbsp;'+fillZero(myHour)+':'+fillZero(myMinute)+':'+fillZero(mySecond)+'&nbsp;&nbsp;'+week[myDay]+'&nbsp;&nbsp;';
        //console.log(nowTime);
        $('#time').html(nowTime);
    };
    function fillZero(str){
        var realNum;
        if(str<10){
            realNum	= '0'+str;
        }else{
            realNum	= str;
        }
        return realNum;
    }
    setInterval(getTime,1000);
 //成功弹出函数
 function success_alert(txt){
    $('.success-txt').text(txt);
    $('.alert-success').slideDown()
}
//失败弹出框函数
function warning_alert(txt){
    $(".warning-txt").text(txt);
    $('.alert-warning').slideDown();
    setTimeout(function(){$('.alert-warning').slideUp('slow')},2000)

}
//成功弹出框函数
function success_alert(txt){
	$(".success-txt").text(txt);
    $('.alert-success').slideDown();

    $('.tbContent').children().remove();
    
    // loading()
    setTimeout(function(){
        $('.alert-success').slideUp() ;
    },2000)
    
    // getData($('.active>a').text())
    

}
$(".showbtns button a").click(function(){
   $(this).parent().css({
       backgroundColor:"#32c5d2"
   })
//    console.log($(this).parent())
})
// $(".am-btn").clcik(function(){

// })
// $(".casema li a").click(function(){
//     let case_btn = `<button type="button" class="am-btn am-btn-default case_manage">
//     <a  href="/auction/case/manage">案件管理</a>
//     </button>
//     <button type="button" class="am-btn am-btn-default case_de">
//         <i>x</i>
//     </button>`
//     $(".showbtns").append(case_btn)
// })
// $(".case_de i").click(function(){
//   console.log(111)
// })

// 全选

  

