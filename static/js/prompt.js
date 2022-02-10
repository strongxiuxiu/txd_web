$(".btn_back").on("click",function(){
	window.history.go(-1);
})
$(".btn_f5").on("click",function(){
	window.location.reload()
})



$('#indicatorContainer1').radialIndicator({
        radius:30,
        barBgColor:'#a0a0a0',
        barColor:'#4ebc87',
        barWidth:15,
        fontSize:2,
        percentage:true,
        fontColor:'#3a3940'
});
var radialObj = $('#indicatorContainer1').data('radialIndicator');
radialObj.animate(100);

if($('.fof_r').text()==" 0 "){
	$('.fof_r').addClass("fof_right")
	$('#indicatorContainer1').addClass("indicatorContainer")
}