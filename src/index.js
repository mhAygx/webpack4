// "use strict"
// import _ from 'lodash'
// function component() {
//     var element = document.createElement('div');

//     // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     return element;
// }

// document.body.appendChild(component());
// const cost = (function () {
//     let arr = [];
//     return function () {
//         if (arguments.length != 0) {
//             [].push.apply(arr, arguments)
//         } else {
//             let monery = 0;
//             arr.forEach((v) => {
//                 monery += v
//             })
//             return monery;
//         }
//     }
// })();
/*
柯里化：curring,又称部分求值，一个curring函数接受参数之后，并不会立即求值，而是立即返回另一函数，并且会利用闭包的形式会将参数保存起来。当函数真正求值的时候会将之前的参数一次性求值。
*/
    var curring = function (fn) {
        let arr=[];//保存每次传入的值。
        return function () {
            if (arguments.length == 0) {
                return fn.apply(this, arr)//参数为空立即求值
            } else {
                [].push.apply(arr, arguments);//参数不为空，保存参数
                console.log(arguments.callee)
                return arguments.callee;//返回当前正在执行的函数。
            }
        }
        
    }
    var cost=(function () {
        let monery=0;
        return function () {
            for (let i = 0; i < arguments.length; i++) {
                const ele = arguments[i];
                monery += ele
            }
            return monery;
        }
    })()
    let mCost=curring(cost);
    mCost(100);
    mCost()
    console.log(mCost());
