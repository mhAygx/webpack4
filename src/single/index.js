/**
 * 单例模式：单例模式保证一个类只有一个实例，并且提供一个它的全局访问点。
 */

/*1、简单的单例模式*/
// let Single=function (name,age) {
//     this.name=name;
//     this.age=age
// }
// Single.prototype.getName=function () {
//     return this.name
// }
// Single.singleOne=(function () {//全局访问点
//     let _single=null;
//     return function (name,age) {//闭包保存_single
//         if(_single){
//             return _single
//         }else{
//             return _single=new Single(name,age)
//         }
//     }
// })();
// var a=Single.singleOne('a',1);
// var b=Single.singleOne('b',2);
// console.log(a===b);//true

/*2、单例模式实现创建一个div:createDiv*/

// var CreateDiv = (function () {
//     var _instance;
//     var CreateDiv = function (html) {
//         if (_instance) {
//             return _instance
//         }
//         this.html = html;
//         this.init();
//         return _instance = this;
//     }
//     CreateDiv.prototype.init = function () {
//         var div = document.createElement('div');
//         div.innerHTML = this.html;
//         document.body.appendChild(div);
//     }
//     return CreateDiv;
// })();
// var a = new CreateDiv('aaaa');
/*
    3.代理模式实现单例模式
*/
// var CreateDiv=function (html) {
//     this.html=html;
//     this.init();
// }
// CreateDiv.prototype.init=function () {
//     var div=document.createElement('div');
//     div.innerHTML=this.html;
//     document.body.appendChild(div);
// }
// var ProxyCreateDiv=(function () {
//     var _instance;
//     return function (html) {
//         if (_instance) {
//             return _instance;
//         }
//         return _instance= new CreateDiv(html);
//     }
// })();
// var a = ProxyCreateDiv('aaaa111')

/*
    4.通用的懒性单例
*/
var Single = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));//this指向window
    }
}
var createDivLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录框！';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}
var loginDiv = new Single(createDivLoginLayer);
document.getElementById("loginBtn").onclick = function () {
    var div = loginDiv()
    div.style.display= "block";
}
var createIframe=function () {
    var iframe=document.createElement('iframe');
    iframe.src='https://www.baidu.com';
    document.body.appendChild(iframe);
    return iframe;
}
var loginIframe=new Single(createIframe);
document.getElementById("loginBaidu").onclick = function () {
    var iframe = loginIframe()
}