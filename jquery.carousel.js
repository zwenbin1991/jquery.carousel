// jQuery轮播插件，支持方向按钮触发、序号触发、自动滚动
// 曾文彬
// 2016-6-1

'use strict';

$.fn.carousel = function (options) {
    var defaultOptions = {
        parent: this, // 父容器
        speed: 500, // 动画速度
        execTime: 500, // 多少时间执行一次轮播
        dir: 0, // 轮播方向
        isAutoPlay: false, // 是否自动轮播
        isExistDireBtn: true // 是否存在左右方向按钮
    };

    function Carousel (config) {
        config = $.extend({}, defaultOptions, config);

        this.parent = config.parent;
        this.childrens = this.parent.find(config.children);
        this.childrenNums = this.childrens.size() + 2;
        this.singleChildrenWidth = this.childrens.eq(0).width();
        this.currentIndex = 1;

        this.constructor.copyToContext('speed,dir,isAutoPlay,isExistDireBtn', config);

        if (config.isAutoPlay) this.constructor.copyToContext.call(this, 'execTime', config);

        if (config.isExistDireBtn) this.constructor.copyToContext.call(this, 'leftDireBtn,rightDireBtn', config, function (prop, value) { this[prop] = $(value); });

        this.init(config.isAutoPlay, config.isExistDireBtn);
    }

    Carousel.prototype.init = function (isAutoPlay, isExistDireBtn) {
        // 元素开头和结尾各插入位置相反的元素，做到无缝滚动
        this.insertToHeadOrFoot();

        // 设置容器总宽度
        this.setSumWidth();

        // 初始化显示第一个元素
        this.setPosition(this.currentIndex * this.singleChildrenWidth);

        // 绑定事件
        this.constructor.bindEvents.apply(this, arguments);

        // 是否自动轮播
        this.isAutoPlay && this.autoPlay();
    };

    Carousel.prototype.insertToHeadOrFoot = function () {
        var head = this.childrens.first().clone();
        var foot = this.childrens.last().clone();

        this.parent.prepend(foot).append(head);
    };

    Carousel.prototype.autoPlay = function () {
        this.timer = setInterval($.proxy(function () {
            this.driver();
        }, this), this.execTime);
    };

    Carousel.prototype.setSumWidth = function () {
        this.parent.width(this.childrenNums * this.singleChildrenWidth);
    };

    Carousel.prototype.driver = function () {
        var currentIndex = this.currentIndex;

        if (this.dir) this.currentIndex++; // 如果轮播方向往右
        else this.currentIndex--;

        // 判断极限情况
        if (this.currentIndex < 0) {
            // 如果往左方向移动到了最后一张
            // 设置currentIndex为倒数第三个位置，插入首尾元素的末尾元素的前一个元素
            this.currentIndex = this.childrenNums - 3;

            // 设置当前位置为倒数第二个位置，插入首尾元素的末尾元素
            this.setPosition((this.childrenNums - 2) * this.singleChildrenWidth);
        } else if (this.currentIndex > this.childrenNums - 1) {
            this.currentIndex = 2;
            this.setPosition(this.singleChildrenWidth);
        }

        if (!this.parent.is(':animated')) {
            this.setPosition(this.currentIndex * this.singleChildrenWidth, true);
        }
    };

    Carousel.prototype.setPosition = function (position, isAnimate) {
        this.parent[isAnimate ? 'animate': 'css']({ left: -position }, this.speed);
    };

    Carousel.bindEvents = function (isAutoPlay, isExistDireBtn) {
        if (isAutoPlay) {
            this.parent.hover($.proxy(function () {
                clearInterval(this.timer);
            }, this), $.proxy(function () {
                this.autoPlay();
            }, this));
        } else if (isExistDireBtn) {
            this.leftDireBtn.click($.proxy(function () {
                this.dir = 0;
                this.driver();
            }, this));

            this.rightDireBtn.click($.proxy(function () {
                this.dir = 1;
                this.driver();
            }, this));
        }
    };

    Carousel.copyToContext = function (props, options, func) {
        var prop = '';
        props = props.split(',');

        for (var i = 0, length = props.length; i < length; i++) {
            prop = props[i];
            func ? func.call(this, prop, options[prop]) : (this[prop] = options[prop]);
        }
    };

    new Carousel(options);
};