window.addEventListener('load', function () {
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // var step = Math.ceil((target - div.offsetLeft) / 10);
            var step = (target - div.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (div.offsetLeft == target) {
                clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            } else {
                div.style.left = div.offsetLeft + step + 'px';
            }
        }, 30)
    }
})