/************************************************************************************************************************************
 *	neosmart STREAM - js core
 *
 *	@copyright:			neosmart GmbH
 *	@licence:			https://neosmart-stream.de/legal/license-agreement/
 *	@documentation:		https://neosmart-stream.de/docs/
 *	@last update:		2013-10-22
 *	
 ************************************************************************************************************************************/
(function(b,a){b.fn.neosmartStream=function(f){var n=this;var v="";var r=b.extend({},b.fn.neosmartStream.defaults,f);r.groupPointer=0;r.collection=[];var l=[];n.each(function(o,y){var z=b(this);var A={$el:z,opt:b.extend({},b.fn.neosmartStream.defaults,f)};A.opt.uid=false;A.opt.uat=false;A.opt.dev=false;v=z.attr("data-path");A.opt.fbLang=z.attr("data-fb-lang");A.opt.cache_time=z.attr("data-cache");A.opt.auto_refresh=z.attr("data-auto-refresh")=="true";A.opt.auto_refresh_time=z.attr("data-refresh-time");A.opt.theme=z.attr("data-theme");A.opt.masonry=z.attr("data-masonry")=="true";A.opt.introFadeIn=z.attr("data-fadein");A.opt.debugMode=z.hasClass("nss-debug");A.opt.group=z.attr("data-group");z.find(".nss-stream").hide().fadeIn(r.introFadeIn);z.removeClass("nss-load").addClass("nss-render");if(z.hasClass("nss-lite")&&z.find(".nss-stream").length){var x=z.find('[data-id="nss-ad"]');if(x.length<1||x.is(":hidden")||x.css("opacity")!=1){z.html(r.ad);return}}l.push(A);c();if(r.debugMode){$debugInfo=z.find(".nss-debug-mode-info")}s(A)});p();function s(o){b.ajax({url:v+"nss-core/ajax-config.php",cache:false,crossDomain:true,data:{theme:o.opt.theme,channel_group:o.opt.group},complete:function(z,x){var y=b.parseJSON(z.responseText);r.cache_time=parseInt(y.cache_time);r.channel_count=parseInt(y.channel_count);if(y.update=="true"){r.collection.push(o.$el)}else{}q()}})}function q(){r.groupPointer++;if(r.groupPointer==n.length){m()}}function m(){r.updated_count=0;n.addClass("nss-update");for(var o=0;o<r.channel_count;o++){t(o)}}function t(o){b.ajax({url:v+"nss-core/ajax-update-channel.php?channel="+o,cache:false,crossDomain:true,complete:function(z,x){var y=b.parseJSON(z.responseText);if(y){e(y.channel,y.status)}else{e(o,"error")}}})}function e(x,o){r.updated_count++;if(o=="error"){className="nss-error"}else{if(o=="success"||o=="up-to-date"){className="nss-success"}else{className=""}}if(r.updated_count==r.channel_count){h()}}function h(){n.each(function(o){b.ajax({url:v+"nss-core/ajax-merge-channels.php",cache:false,crossDomain:true,data:{theme:l[o].opt.theme,channel_group:l[o].opt.group},complete:function(y,x){u("Global cache is up-to-date",false,"nss-success");w(o,y.responseText)}})})}function p(){n.find(".nss-facebook-show-comments").unbind("click").click(function(o){b(o.currentTarget).parent().parent().find(".nss-facebook-comments").slideToggle()})}function c(){for(key in l){if(typeof l[key].opt=="object"&&l[key].opt.masonry){l[key].$el.find(".nss-stream-wrap").masonry({itemSelector:".nss-item",animationOptions:{duration:300},containerStyle:"relative"})}}}function i(){for(key in l){if(typeof l[key].opt=="object"&&l[key].opt.masonry){l[key].$el.find(".nss-stream-wrap").masonry("reload")}}}function w(A,B){$this=l[A].$el;var z=$this.find(".nss-first-load");if(z.length){z.replaceWith(B);$this.find(".nss-feedback-root").remove();$this.find(".nss-stream").hide().fadeIn(r.introFadeIn);setTimeout(c,100);p()}if(!l[A].opt.masonry){var C=$this.find(".nss-item");var x=C.first();var o=b(".nss-item",B);o.each(function(E,F){var D=b(F);if(D.attr("data-id")&&C.filter('[data-id="'+D.attr("data-id")+'"]').length==0){D.hide().insertBefore(x).fadeIn(r.introFadeIn)}})}if(!l[A].opt.auto_refresh){return false}var y=Math.max(l[A].opt.auto_refresh_time,30);setTimeout(m,y*1000)}function u(y,o,x){if(!r.debugMode){return false}if(o){$debugInfo.html("")}$debugInfo.append('<div class="nss-info '+x+'">'+y+"</div>")}d();return n;function d(){var x=n.find(".nss-feedback-root");if(!x.length||n.hasClass("nss-lite")){b(".nss-feedback").remove();return false}var o={};n.each(function(z,A){var y=b(A);y.find(".nss-feedback-open").click(function(B){g(y,B)});y.find(".nss-feedback-link").click(function(B){j(y,B)})});b(".nss-feedback").slideDown(i)}function g(z,y){var o=b(y.currentTarget);var A=o.parent();var x='<iframe width="100%" height="300" src="https://api.neosmart-stream.com/feedback/index.php?fblang='+r.fbLang+"&uid="+A.parent().attr("data-id")+'"></iframe>';if(o.hasClass("nss-active")){z.find(".nss-feedback-root-container").html("");o.removeClass("nss-active")}else{z.find(".nss-feedback-root-container").html(x).insertAfter(A);z.find(".nss-feedback-open").removeClass("nss-active");o.addClass("nss-active")}}function j(z,y){var o=b(y.currentTarget);var A=o.parent();var x='<iframe width="100%" height="200" src="https://api.neosmart-stream.com/feedback/index.php?fblang='+r.fbLang+"&oid="+A.attr("data-object-id")+'"></iframe>';if(o.hasClass("nss-active")){A.find(".nss-feedback-container").html("");o.removeClass("nss-active")}else{A.find(".nss-feedback-container").html(x);o.addClass("nss-active")}}function k(o){b(o.currentTarget).parent().submit();this.blur();return false}return $this};b.fn.neosmartStream.defaults={cache_time:60,auto_refresh:true,auto_refresh_time:60,channel_count:0,updated_count:0,dev:false,path:"neosmart-stream/",theme:"base",masonry:false,debugMode:false,fbLang:"en_US",introFadeIn:700,group:"all",ad:"<div class='nss-warning'>Error: hidden branding</div>"};b(document).ready(function(){b(".nss").neosmartStream()})})(jQuery,window);