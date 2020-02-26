!function(){"use strict";angular.module("cfp.hotkeys",[]).provider("hotkeys",["$injector",function(e){this.includeCheatSheet=!0,this.useNgRoute=e.has("ngViewDirective"),this.templateTitle="Keyboard Shortcuts:",this.templateHeader=null,this.templateFooter=null,this.template='<div class="cfp-hotkeys-container fade" ng-class="{in: helpVisible}" style="display: none;"><div class="cfp-hotkeys"><h4 class="cfp-hotkeys-title" ng-if="!header">{{ title }}</h4><div ng-bind-html="header" ng-if="header"></div><table><tbody><tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }"><td class="cfp-hotkeys-keys"><span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span></td><td class="cfp-hotkeys-text">{{ hotkey.description }}</td></tr></tbody></table><div ng-bind-html="footer" ng-if="footer"></div><div class="cfp-hotkeys-close" ng-click="toggleCheatSheet()">&#215;</div></div></div>',this.cheatSheetHotkey="?",this.cheatSheetDescription="Show / hide this help menu",this.$get=["$rootElement","$rootScope","$compile","$window","$document",function(e,r,t,i,n){var o=!0;function a(e){var t={command:"⌘",shift:"⇧",left:"←",right:"→",up:"↑",down:"↓",return:"⏎",backspace:"⌫"};e=e.split("+");for(var n=0;n<e.length;n++)"mod"===e[n]&&(i.navigator&&0<=i.navigator.platform.indexOf("Mac")?e[n]="command":e[n]="ctrl"),e[n]=t[e[n]]||e[n];return e.join(" + ")}function u(e,t,n,i,o,r){this.combo=e instanceof Array?e:[e],this.description=t,this.callback=n,this.action=i,this.allowIn=o,this.persistent=r,this._formated=null}Mousetrap.prototype.stopCallback=function(e,t){return!o||!(-1<(" "+t.className+" ").indexOf(" mousetrap "))&&(t.contentEditable&&"true"==t.contentEditable)},u.prototype.format=function(){if(null===this._formated){for(var e=this.combo[0].split(/[\s]/),t=0;t<e.length;t++)e[t]=a(e[t]);this._formated=e}return this._formated};var f=r.$new();f.hotkeys=[],f.helpVisible=!1,f.title=this.templateTitle,f.header=this.templateHeader,f.footer=this.templateFooter,f.toggleCheatSheet=y;var s={};if(this.useNgRoute&&r.$on("$routeChangeSuccess",function(e,n){p(),n&&n.hotkeys&&angular.forEach(n.hotkeys,function(e){var t=e[2];("string"==typeof t||t instanceof String)&&(e[2]=[t,n]),e[5]=!1,k.apply(this,e)})}),this.includeCheatSheet){var c=n[0],l=e[0],h=angular.element(this.template);k(this.cheatSheetHotkey,this.cheatSheetDescription,y),l!==c&&l!==c.documentElement||(l=c.body),angular.element(l).append(t(h)(f))}function p(){for(var e=f.hotkeys.length;e--;){var t=f.hotkeys[e];t&&!t.persistent&&m(t)}}var d=!1;function y(){f.helpVisible=!f.helpVisible,f.helpVisible?(d=g("esc"),m("esc"),k("esc",d.description,y,null,["INPUT","SELECT","TEXTAREA"])):(m("esc"),!1!==d&&k(d))}function k(e,t,n,i,o,r){var a,s=["INPUT","SELECT","TEXTAREA"];if("[object Object]"===Object.prototype.toString.call(e)&&(t=e.description,n=e.callback,i=e.action,r=e.persistent,o=e.allowIn,e=e.combo),m(e),t instanceof Function?(i=n,n=t,t="$$undefined$$"):angular.isUndefined(t)&&(t="$$undefined$$"),void 0===r&&(r=!0),"function"==typeof n){var c;a=n,o instanceof Array||(o=[]);for(var l=0;l<o.length;l++)o[l]=o[l].toUpperCase(),-1!==(c=s.indexOf(o[l]))&&s.splice(c,1);n=function(e){var t=!0;if(e){var n=e.target||e.srcElement,i=n.nodeName.toUpperCase();if(-1<(" "+n.className+" ").indexOf(" mousetrap "))t=!0;else for(var o=0;o<s.length;o++)if(s[o]===i){t=!1;break}}t&&v(a.apply(this,arguments))}}"string"==typeof i?Mousetrap.bind(e,v(n),i):Mousetrap.bind(e,v(n));var h=new u(e,t,n,i,o,r);return f.hotkeys.push(h),h}function m(e){var t=e instanceof u?e.combo:e;if(Mousetrap.unbind(t),angular.isArray(t)){for(var n=!0,i=t.length;i--;)n=m(t[i])&&n;return n}var o=f.hotkeys.indexOf(g(t));return-1<o&&(1<f.hotkeys[o].combo.length?f.hotkeys[o].combo.splice(f.hotkeys[o].combo.indexOf(t),1):(angular.forEach(s,function(e){var t=e.indexOf(f.hotkeys[o]);-1!==t&&e.splice(t,1)}),f.hotkeys.splice(o,1)),!0)}function g(e){if(!e)return f.hotkeys;for(var t,n=0;n<f.hotkeys.length;n++)if(-1<(t=f.hotkeys[n]).combo.indexOf(e))return t;return!1}function v(o){return function(e,t){if(o instanceof Array){var n=o[0],i=o[1];o=function(e){i.scope.$eval(n)}}r.$apply(function(){o(e,g(t))})}}return{add:k,del:m,get:g,bindTo:function(n){return n.$id in s||(s[n.$id]=[],n.$on("$destroy",function(){for(var e=s[n.$id].length;e--;)m(s[n.$id].pop())})),{add:function(e){var t;return t=1<arguments.length?k.apply(this,arguments):k(e),s[n.$id].push(t),this}}},template:this.template,toggleCheatSheet:y,includeCheatSheet:this.includeCheatSheet,cheatSheetHotkey:this.cheatSheetHotkey,cheatSheetDescription:this.cheatSheetDescription,useNgRoute:this.useNgRoute,purgeHotkeys:p,templateTitle:this.templateTitle,pause:function(){o=!1},unpause:function(){o=!0}}}]}]).directive("hotkey",["hotkeys",function(r){return{restrict:"A",link:function(e,t,n){var i,o=[];angular.forEach(e.$eval(n.hotkey),function(e,t){i="string"==typeof n.hotkeyAllowIn?n.hotkeyAllowIn.split(/[\s,]+/):[],o.push(t),r.add({combo:t,description:n.hotkeyDescription,callback:e,action:n.hotkeyAction,allowIn:i})}),t.bind("$destroy",function(){angular.forEach(o,r.del)})}}}]).run(["hotkeys",function(e){}])}(),function(e,i){for(var o,r={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},n={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},a={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},s={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},t=1;t<20;++t)r[111+t]="f"+t;for(t=0;t<=9;++t)r[t+96]=t;function g(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)}function v(e){if("keypress"!=e.type)return r[e.which]?r[e.which]:n[e.which]?n[e.which]:String.fromCharCode(e.which).toLowerCase();var t=String.fromCharCode(e.which);return e.shiftKey||(t=t.toLowerCase()),t}function b(e){return"shift"==e||"ctrl"==e||"alt"==e||"meta"==e}function c(e,t,n){return n||(n=function(){if(!o)for(var e in o={},r)95<e&&e<112||r.hasOwnProperty(e)&&(o[r[e]]=e);return o}()[e]?"keydown":"keypress"),"keypress"==n&&t.length&&(n="keydown"),n}function $(e,t){var n,i,o,r=[];for(n=function(e){return"+"===e?["+"]:(e=e.replace(/\+{2}/g,"+plus")).split("+")}(e),o=0;o<n.length;++o)i=n[o],s[i]&&(i=s[i]),t&&"keypress"!=t&&a[i]&&(i=a[i],r.push("shift")),b(i)&&r.push(i);return{key:i,modifiers:r,action:t=c(i,r,t)}}function w(e){var d=this;if(e=e||i,!(d instanceof w))return new w(e);d.target=e,d._callbacks={},d._directMap={};var c,y={},l=!1,h=!1,u=!1;function f(e){e=e||{};var t,n=!1;for(t in y)e[t]?n=!0:y[t]=0;n||(u=!1)}function p(e,t,n,i,o,r){var a,s,c,l,h=[],u=n.type;if(!d._callbacks[e])return[];for("keyup"==u&&b(e)&&(t=[e]),a=0;a<d._callbacks[e].length;++a)if(s=d._callbacks[e][a],(i||!s.seq||y[s.seq]==s.level)&&u==s.action&&("keypress"==u&&!n.metaKey&&!n.ctrlKey||(c=t,l=s.modifiers,c.sort().join(",")===l.sort().join(",")))){var f=!i&&s.combo==o,p=i&&s.seq==i&&s.level==r;(f||p)&&d._callbacks[e].splice(a,1),h.push(s)}return h}function k(e,t,n,i){d.stopCallback(t,t.target||t.srcElement,n,i)||!1===e(t,n)&&(function(e){e.preventDefault?e.preventDefault():e.returnValue=!1}(t),function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}(t))}function t(e){"number"!=typeof e.which&&(e.which=e.keyCode);var t=v(e);t&&("keyup"!=e.type||l!==t?d.handleKey(t,function(e){var t=[];return e.shiftKey&&t.push("shift"),e.altKey&&t.push("alt"),e.ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),t}(e),e):l=!1)}function s(t,e,n,i){function o(e){return function(){u=e,++y[t],clearTimeout(c),c=setTimeout(f,1e3)}}function r(e){k(n,e,t),"keyup"!==i&&(l=v(e)),setTimeout(f,10)}for(var a=y[t]=0;a<e.length;++a){var s=a+1===e.length?r:o(i||$(e[a+1]).action);m(e[a],s,i,t,a)}}function m(e,t,n,i,o){d._directMap[e+":"+n]=t;var r,a=(e=e.replace(/\s+/g," ")).split(" ");1<a.length?s(e,a,t,n):(r=$(e,n),d._callbacks[r.key]=d._callbacks[r.key]||[],p(r.key,r.modifiers,{type:r.action},i,e,o),d._callbacks[r.key][i?"unshift":"push"]({callback:t,modifiers:r.modifiers,action:r.action,seq:i,level:o,combo:e}))}d._handleKey=function(e,t,n){var i,o=p(e,t,n),r={},a=0,s=!1;for(i=0;i<o.length;++i)o[i].seq&&(a=Math.max(a,o[i].level));for(i=0;i<o.length;++i)if(o[i].seq){if(o[i].level!=a)continue;s=!0,r[o[i].seq]=1,k(o[i].callback,n,o[i].combo,o[i].seq)}else s||k(o[i].callback,n,o[i].combo);var c="keypress"==n.type&&h;n.type!=u||b(e)||c||f(r),h=s&&"keydown"==n.type},d._bindMultiple=function(e,t,n){for(var i=0;i<e.length;++i)m(e[i],t,n)},g(e,"keypress",t),g(e,"keydown",t),g(e,"keyup",t)}w.prototype.bind=function(e,t,n){return e=e instanceof Array?e:[e],this._bindMultiple.call(this,e,t,n),this},w.prototype.unbind=function(e,t){return this.bind.call(this,e,function(){},t)},w.prototype.trigger=function(e,t){return this._directMap[e+":"+t]&&this._directMap[e+":"+t]({},e),this},w.prototype.reset=function(){return this._callbacks={},this._directMap={},this},w.prototype.stopCallback=function(e,t){return!(-1<(" "+t.className+" ").indexOf(" mousetrap "))&&(!function e(t,n){return t!==i&&(t===n||e(t.parentNode,n))}(t,this.target)&&("INPUT"==t.tagName||"SELECT"==t.tagName||"TEXTAREA"==t.tagName||t.isContentEditable))},w.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)},w.init=function(){var t=w(i);for(var e in t)"_"!==e.charAt(0)&&(w[e]=function(e){return function(){return t[e].apply(t,arguments)}}(e))},w.init(),e.Mousetrap=w,"undefined"!=typeof module&&module.exports&&(module.exports=w),"function"==typeof define&&define.amd&&define(function(){return w})}(window,document);