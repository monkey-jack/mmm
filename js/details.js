/**
 * Created by Administrator on 2017.2.26.
 */
$(function () {

    //获取地址栏信息，并解决地址转码问题
    var urlData = window.location.search.substring(1).split('=');

    $.ajax({
        url:'http://192.168.23.72:3000/api/getproduct',
        data:{productid:urlData[1]},
        dataType:'jsonp',
        success:function (data) {
            $('#message').html(template('shop',data));
            $('#table').html(data.result[0].bjShop);
            $('#nav_3').html(data.result[0].productName.split(' ')[0]);
        }
    });

    $.ajax({
        url:'http://192.168.23.72:3000/api/getproductcom',
        data:{productid:urlData[1]},
        dataType:'jsonp',
        success:function (data) {
            $('#comment_model').html(template('commit',data));

            $.ajax({
                url: 'http://mmb.ittun.com/api/getcategorybyid',
                data: {categoryid: data.result[0].categoryId},
                dataType: 'jsonp',
                success: function (data) {
                    $('#nav_2').html(data.result[0].category);
                }
            });

        }
    })
})