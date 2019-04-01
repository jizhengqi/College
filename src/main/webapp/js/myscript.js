/**
* 显示提示信息几秒之后自动消失
* @param text
*/
var t;
var tt;
function msgss(text,s) {
    if($("#message").val() == null){
        $("body").append("<div id='message'></div>");
    }
    $("#message").css('position','fixed');
    $("#message").css('top','100px');
    $("#message").css('left','47%');
    $("#message").css('width','120px');
    $("#message").css('margin-left','-100px');
    $("#message").css('border-width','0');
    $("#message").css('border-radius','0.6em');
    $("#message").css('color','#ffffff');
    $("#message").css('background-color','#2c2c2c');
    $("#message").css('box-shadow','0 0 12px rgba(0, 0, 0, 0.6)');
    $("#message").css('padding','10px');
    $("#message").css('text-align','center');
    $("#message").css('opacity','0.6');
    $("#message").css('z-index','1500');
    $("#message").css('-webkit-transition','opacity 1s ease-out');/* Saf3.2+, Chrome */  
    $("#message").css('-moz-transition','opacity 1s ease-out');/* FF4+ */  
    $("#message").css('-ms-transition','opacity 1s ease-out');/* IE10? */ 
    $("#message").css('-o-transition','opacity 1s ease-out');/* Opera 10.5+ */
    $("#message").css('transition','opacity 1s ease-out');
    $(".message").css('position','fixed');
    $(".message").css('top','100px');
    $(".message").css('left','47%');
    $(".message").css('width','120px');
    $(".message").css('margin-left','-100px');
    $(".message").css('border-width','0');
    $(".message").css('border-radius','0.6em');
    $(".message").css('color','#ffffff');
    $(".message").css('background-color','#2c2c2c');
    $(".message").css('box-shadow','0 0 12px rgba(0, 0, 0, 0.6)');
    $(".message").css('padding','10px');
    $(".message").css('text-align','center');
    $(".message").css('opacity','0.6');
    $(".message").css('z-index','1500');
    $(".message").css('-webkit-transition','opacity 1s ease-out');/* Saf3.2+, Chrome */  
    $(".message").css('-moz-transition','opacity 1s ease-out');/* FF4+ */  
    $(".message").css('-ms-transition','opacity 1s ease-out');/* IE10? */ 
    $(".message").css('-o-transition','opacity 1s ease-out');/* Opera 10.5+ */
    $(".message").css('transition','opacity 1s ease-out');
    if(g('checkError')!=null){
        hide('checkError');
    }
    if (text == '') {
        return;
    }
    var msgDiv = g('message');
    msgDiv.innerHTML=text;
    msgDiv.style.opacity=1;
    msgDiv.style.filter="alpha(opacity=60)";
    show('message');
    clearTimeout(t);
    clearTimeout(tt);
    tt=setTimeout("test('message')", s);
}
function test(id){    
    g(id).style.opacity= 0;
    g(id).style.filter="alpha(opacity=0)";
    t=setTimeout("hide('message')", 1000);
}
function g(id) {
    return document.getElementById(id);
}
function hide(id) {
    g(id).style.display = 'none';
}
function show(id) {
    g(id).style.display = 'block';
}