define("common:widget/topnav/topnav.js",function(n,e,o){function t(){a.bindEvent()}var a={dom:{navBtn:$('a[node-type="nav-link"]'),panelItem:$('li[node-type="nav-panel-item"]')},bindEvent:function(){a.dom.navBtn.hover(function(){var n=a.dom.navBtn.index(this);a.dom.panelItem.eq(n).css("background-color","#F7F7F7"),a.dom.panelItem.eq(n).find(".angle").css("display","block")},function(){var n=a.dom.navBtn.index(this);a.dom.panelItem.eq(n).css("background-color",""),a.dom.panelItem.eq(n).find(".angle").css("display","")})}};o.exports.init=t});
;define("common:widget/header/header.js",function(e,s,o){var c=c||{},t="https:"==document.location.protocol?"https://":"http://";c={init:function(){this.bind()},bind:function(){var e=this;$(".icon-box").on("click","#search-btn",this.searchshow),$(".searchbox").on("click","#close-btn",this.searchide),$(".searchbox").on("click","#search-btn",this.sbtnGo),$("#web_search_header").on("keyup",{_this:e},this.siptKeyUp)},searchshow:function(){$(".searchbox").addClass("scale")},searchide:function(){$(".searchbox").removeClass("scale")},sbtnGo:function(){var e=$("#web_search_header").val();""!=e&&(location.href=t+"search.jikexueyuan.com/course/?q="+e)},siptKeyUp:function(e){var_focus=$("#web_search_header").is(":focus"),1!=var_focus||13!=e.keyCode&&10!=e.keyCode||e.data._this.sbtnGo()}},o.exports=c});