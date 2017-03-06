/**
 * Created by JYX on 2017.2.23.
 */

$(function () {

    /*商品导航*/
    $.ajax({
        url: 'http://192.168.23.25:3000/api/getindexmenu',
        dataType: 'jsonp',
        success: function (data) {
            $('#goods_list').html(template('template', data));

            $('#goods_list li:nth-child(8)').click(function () {
                if ($('#goods_list li:nth-child(9)').css('display') == 'none') {
                    $('#goods_list li:nth-child(n+9)').css('display', 'block');
                } else {
                    $('#goods_list li:nth-child(n+9)').css('display', 'none');
                }
            });
        }
    });


    /*优惠推荐*/
    $.ajax({
        url: 'http://192.168.23.25:3000/api/getmoneyctrl',
        success: function (data) {
            $('#goods_display').html(template('goods', data));
        }
    });



});