function Swiper(obj) {
	this.wrape = obj.obj1;
    this.hand=obj.obj2;
	this.left = obj.left;
	this.right = obj.right;
	this.callback = obj.callback;
	this.type = obj.type;
    this.lock=false;
	this._init();
	this._initDom();
	this._initEvent();
    

}
Swiper.prototype = {
	_init: function () {
		this.w = $(window).height();
	},
	_initDom: function () {
		this.item = $(this.wrape).find(".wrapper"); //每一张图片所在地
		this.len = this.item.length;
		this.index = 0;
		this.offsetX = 0;
		this.moveX = 0;
		this.startX = 0;

		var w = this.w;
		for (var i = 0; i < this.len; i++) {
			$(this.item[i]).css('-webkit-transform', 'translate3d(0,' + w * i + 'px,0)');
		}
	},
	_initEvent: function () {
		var self = this;
        $(this.hand).on("touchstart",function(e){
            e.preventDefault();
           self._start("+1", e.type,self.callback) 
        });
		this.item.on("touchstart", function (e) {
			e.preventDefault();
			self.startX = e.touches[0].screenY;
			self.moveX = 0;
			self.offsetX = 0;
		});
        
		this.item.on("touchmove", function (e) {
			e.preventDefault();
			self.moveX = e.touches[0].screenY;
			w = self.w;
			self.offsetX = self.moveX - self.startX;

			//这是理解的分割线
			/*for (var i = 0; i < self.len; i++) {
				$(self.item[i]).css({
					"-webkit-transform": "translate3d(0," + ((i - self.index) * w + self.offsetX) + "px,0)",
					"-webkit-transition": "none"
				});
			}*/
		});
		this.item.on("touchend", function (e) {
			e.preventDefault();
			var offx = self.offsetX;
			//console.log(offx)
            //如果有这个锁,下面代码不执行
            if(self.lock){
                return false;
            }
            //e.type=touchend
			if (offx > 0) {
				self._start("-1", e.type,self.callback); //向左滑下一张
			} else if (offx < 0) {
				self._start("+1", e.type,self.callback) //向右滑上一张
			}
		});
		$(this.left).on("click", function (e) {
			self._start("-1", e.type);
		});
		$(this.right).on("click", function (e) {
			self._start("+1", e.type);
		})
	},
	_start: function (num, type,callback) {
		var nowp = 0,
			w = this.w,
			index = this.index,
			len = this.len;
        console.log(index);
		if (typeof (num) == "number") {
			nowp = num;
		} else if (typeof (num) == "string") {
			nowp = index + num * 1;
		}
		if (nowp < 0) {
			nowp = 0;
		} else if (nowp > len - 1) {
			nowp = len - 1;
		}

		$(this.item[nowp - 1]) && $(this.item[nowp - 1]).css({
			"-webkit-transition": "-webkit-transform 1s",
			"-webkit-transform": "translate3d(0," + (-w) + "px,0)",
            "display":"none"
		});
		$(this.item[nowp]) && $(this.item[nowp]).css({
			"-webkit-transition": "-webkit-transform 1s ",
			"-webkit-transform": "translate3d(0,0,0)",
            "display":"block"
		});
		$(this.item[nowp + 1]) && $(this.item[nowp + 1]).css({
			"-webkit-transition": "-webkit-transform 1s",
			"-webkit-transform": "translate3d(0," + w + "px,0)",
            "display":"none"
		});
		//console.log(nowp)
		this.index = nowp;
		if (type.indexOf(this.type) >= 0) {
			this.callback && this.callback();
		}
		//console.log(this.index)
        callback && this.callback(nowp,this.hand);

	}
}