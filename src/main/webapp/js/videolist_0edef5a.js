define("course:widget/videolist/videolist.js",function(i,e,n){var t={init:function(){this.bindEvent()},bindEvent:function(){$(".user-action").one("click",this.clickLike)},clickLike:function(){var i=$(this),e={resId:i.attr("current_res_id")};$.ajax({url:"clickzan",type:"get",data:e,success:function(e){if(200==e.code){var n=parseInt(i.children(" span").text());i.children(" span").text(n+1),i.children(" i").removeClass("zan-no"),i.children(" i").removeClass("user-action"),i.children(" i").addClass("zan-yes")}}})}};n.exports=t});