## jQuery.carousel
一个基于jQuery的轮播插件，支持方向按钮触发、序号触发、调用既自动触发

## Usage
	
	<div class="effect clearfix">
        <div class="effect-list clearfix">
            <div class="cases">
                <a href="#" class="icon-view_btn">查看在线商城</a>
                <img src="imgs/shopTV/tv_shop1.jpg" width="100%" />
            </div>
            <div class="cases">
                <a href="#" class="icon-view_btn">查看在线商城</a>
                <img src="imgs/shopTV/tv_shop2.jpg" width="100%" />
            </div>
        </div>
     </div>
	 <script src="jquery.js"></script>
	 <script src="jquery.carousel.js"></script>
	 <script>
		$(function () {
            $('.solution-successcases .effect-list').carousel({
                children: '.cases',
                leftDireBtn: '.icon-left_dir',
                rightDireBtn: '.icon-right_dir'
            });
        });
	 </script>

## LICENSE
MIT