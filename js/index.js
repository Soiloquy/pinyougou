window.addEventListener('load', function () {
    var twoArrow = document.querySelectorAll('.ar');
    var focus = document.querySelector('.focus');
    // 添加两侧箭头显示事件
    focus.addEventListener('mouseenter', function () {
        for (let i = 0; i < twoArrow.length; i++) {
            twoArrow[i].style.display = 'block';
        }
        // 清空定时器
        clearInterval(timer);
        timer = null;//清空定时器
    })
    focus.addEventListener('mouseleave', function () {
        for (let i = 0; i < twoArrow.length; i++) {
            twoArrow[i].style.display = 'none';
        }
        // 开启定时器
        timer = setInterval(() => {
            // 手动调用点击事件
            twoArrow[1].click();
        }, 2000);
    })
    // 生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (let i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
    }
    // 轮播图动画
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // var step = Math.ceil((target - div.offsetLeft) / 10);
            var step = (target - ul.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (ul.offsetLeft == target) {
                clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            } else {
                ul.style.left = ul.offsetLeft + step + 'px';
            }
        }, 30)
    }
    var num = 0;
    // 添加小圆圈的点击事件
    ol.children[0].className = 'current';
    var picWidth = focus.offsetWidth;
    for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].addEventListener('click', function () {
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            var getIndex = this.getAttribute('index');
            getIndex = parseInt(getIndex);
            getIndex += 1;
            num = getIndex;
            animate(ul, -getIndex * picWidth)
        })
    }
    // 克隆第一张图片
    var firstPic = ul.children[0].cloneNode(true);
    ul.appendChild(firstPic);
    // 点击左右箭头切换图片
    // flag节流阀
    var flag = true;
    twoArrow[1].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ol.children.length) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            console.log(num);
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            if (num == 4) {
                ol.children[0].className = 'current';
            } else {
                ol.children[num].className = 'current';
            }
            animate(ul, -num * picWidth, function () {
                flag = true;//打开节流阀
            });
        }
    })
    twoArrow[0].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = -ol.children.length * picWidth + 'px';
                num = ol.children.length;
            }
            num--;
            console.log(num);
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            ol.children[num].className = 'current';
            animate(ul, -num * picWidth, () => {
                flag = true;//打开节流阀
            });
        }
    })
    // 自动播放轮播图
    var timer = setInterval(() => {
        // 手动调用点击事件
        twoArrow[1].click();
    }, 2000);
})