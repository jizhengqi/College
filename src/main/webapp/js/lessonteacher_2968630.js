define("course:widget/lessonteacher/lessonteacher.js",function(o,n,s){var e={init:function(){this.bindEvent()},bindEvent:function(){$("#course_download").bind("click",this.downLoadRes),$(".isVipUser").on("click",this.isVipUser)},downLoadRes:function(){var o=$("#course_download").attr("course_id"),n={course_id:o};$.ajax({url:"/course/downloadRes",type:"get",data:n,success:function(o){200==o.code?window.location.href=o.data.url:JKXY.msgBox(1,o.msg)},error:function(){JKXY.msgBox(1,"网络错误刷新重试！")}})},isVipUser:function(){JKXY.msgBox(1,"VIP 会员才可以下载课程资料哦 ~")}};s.exports=e});