/**
 * Created by Administrator on 2017.2.28.
 */
$(function () {
    $.ajax({
        url: 'http://192.168.23.25:3000/api/getinlanddiscount',
        dataType: 'jsonp',
        success: function (data) {
            var count = 0;

            //先加载四个
            loadFun(count);

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();               //滚动条距离顶部的高度
                var scrollHeight = $(document).height();                   //当前页面的总高度
                var windowHeight = $(this).height();                   //当前可视的页面高度
                if (scrollTop + windowHeight >= scrollHeight) {
                    if (count * 4 >= data.result.length) {
                        $('#loading').css('display','none');
                        return false;
                    }
                    count+=4;
                    //滚动到底部再加载四个
                    loadFun(count);
                    $('#loading').css('display','block');
                } else if (scrollTop <= 0) {         //滚动条距离顶部的高度小于等于0
                    console.log('下拉刷新');
                }
            });


            /*实现滚动加载*/
            function loadFun(count) {
                var newData = {load: []};
                for (var i = count; i < count+4; i++) {
                    if (data.result[i]) {
                        newData.load.push(data.result[i]);
                    }
                }
                $('#discount').append(template('list', newData));
            }
        }
    })
});