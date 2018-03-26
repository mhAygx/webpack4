/**
 * 策略模式
 * 实现小球运动 
 */

/** 
 * tween 类定义运动的方式
 * @author mahui
 * @param t 动画已消耗的时间
 * @param b 小球原始位置
 * @param c 小球目标位置
 * @param t 动画持续总时间
 * 
 */

var tween = {
    linear(t, b, c, d) {
        return c * t / d + b;
    },
    easeIn(t, b, c, d) {
        return c * (t /= d) * t + b
    },
    strongEaseIn(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
}

/**
 * @class Animate
 * @author mahui
 * @Time 
 * @param dom 即将运动的dom节点
 */

var Animate = function (dom) {
    this.dom = dom;//要运动的dom节点
    this.startTime = 0;//动画开始时间
    this.startPos = 0;//动画开始的位置
    this.endPos = 0;//动画结束位置
    this.propertyName = null;//dom需要改变的css属性
    this.easing = null;//运动的算法
    this.duration = null;//动画尺寸时间
}
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    this.startTime = +new Date();
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.duration = duration;
    this.endPos = endPos;
    this.easing = tween[easing];
    var s = this;
    var timer = setInterval(function () {
        if (s.step() === false) {
            clearInterval(timer);
        }
    }, 19)
}
Animate.prototype.step = function () {
    console.log(111)
    var t = +new Date;        // 取得当前时间     
    if (t >= this.startTime + this.duration) {       // (1)         
        this.update(this.endPos);   // 更新小球的 CSS 属性值        
        return false;
    }
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);     // pos 为小球当前位置   
    this.update(pos);    // 更新小球的 CSS 属性值 
};
Animate.prototype.update = function (pos) { 
    this.dom.style[this.propertyName] = pos + 'px';
};
var div = document.getElementById('div'); 
var animate = new Animate(div);

animate.start('left', 500, 1000, 'strongEaseOut'); 
// animate.start( 'top', 1500, 500, 'strongEaseIn' )