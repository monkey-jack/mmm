/**
 * Created by Administrator on 2017.2.25.
 */
$(function () {


    /*商品分类展示*/
    $.ajax({
        url: 'http://192.168.23.25:3000/api/getcategorytitle',
        dataType: 'jsonp',
        success: function (data) {
            $('#commodity_list').html(template('commodity', data));
            var result = data.result;

            $('.module h3').each(function (i, v) {
                /*点击相应的标题*/
                this.onclick = function () {
                    $.ajax({
                        url: 'http://192.168.23.25:3000/api/getcategory',
                        data: {'titleid': result[i].titleId},
                        dataType: 'jsonp',
                        success: function (data) {

                            /*设置排他事件，并渲染*/
                            //获取到要追加的标签
                            var tag = $('#list_' + result[i].titleId);

                            //设置标记，记录当前标签的display属性，是隐藏还是显示
                            var flag = true;
                            tag.css('display') == 'block' ? flag = false : flag = true;

                            //将所有的module下面的ul标签设置隐藏，并将小箭头都设置不旋转
                            $('.module').find('.list').slideUp();
                            $('.module i').css('transform', 'rotate(0deg)');

                            //获取到相应的拼接的模板，然后追加到指定的标签
                            $('#list_' + result[i].titleId).html(template('shopList', data));

                            //判断此标签是否已经显示，并让其显示，若没显示再让其显示.并旋转小箭头
                            if (flag) {
                                tag.slideDown();
                                $(v).find('i').css('transform', 'rotate(180deg)');
                            }

                        }
                    });
                }

            });

        }
    });
});