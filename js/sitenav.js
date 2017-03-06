/**
 * Created by Administrator on 2017.3.1.
 */
$(function () {
    $.ajax({
        url:'http://192.168.23.25:3000/api/getsitenav',
        dataType:'jsonp',
        success:function (data) {
            $('.mmm_section').html(template('listShop',data));
        }
    })
})