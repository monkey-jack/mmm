/**
 * Created by Administrator on 2017.2.28.
 */
$(function () {

    $.ajax({
        url:'http://192.168.23.72:3000/api/getbaicaijiatitle',
        // url:'http://192.168.23.48:3000/api/getbaicaijiatitle',
        dataType:'jsonp',
        success:function (data) {
            /*渲染导航栏*/
            $('#navgation').html(template('ulLis',data));

            /*计算每个li的宽度，给ul设总宽度*/
            var ulWidth=0;
            $('#navgation>li').each(function (i, v) {
                ulWidth+=v.clientWidth;
            });
            $('#navgation').css('width',ulWidth+10);
            /*给第一个li标签设置默认类名（此类名的元素包含样式）*/
            $('#navgation li:first-child').addClass('choose');

            //通过调用swipe的库，设置滑动
            function LeftSwipe(){
                /*通过封装的swipe插件来实现*/
                itcast.iScroll({
                    swipeDom:document.querySelector('.mmm_nav'),/*父容器对象*/
                    swipeType:'x',/*滑动的方向*/
                    swipeDistance:100/*缓冲的距离*/
                });
            }
            LeftSwipe();

            /*打开页面，默认全部渲染*/
            ajaxList(0);

            /*给每个li注册点击事件，点击哪个就动态渲染哪个，并将包含样式的类名加上，其他的将类名移出掉*/
            $('#navgation>li').on('click',function () {
                $('#navgation>li').removeClass('choose');
                this.className='choose';
                var id=this.id;
                ajaxList(id);
            })


            /*封装方法，供每次渲染的时候调用*/
            function ajaxList(id) {
                $.ajax({
                    url:'http://192.168.23.72:3000/api/getbaicaijiaproduct',
                    data:{titleid:id},
                    dataType:'jsonp',
                    success:function (data) {
                        $('.mmm_section').html(template('list',data));
                    }
                })
            }
        }
    })


})