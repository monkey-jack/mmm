/**
 * Created by Administrator on 2017.2.28.
 */
$(function () {
    $.ajax({
        url:'http://192.168.23.25:3000/api/getcoupon',
        dataType:'jsonp',
        success:function (data) {
            $('.mmm_section').html(template('couponDisplay',data));
        }
    })
})