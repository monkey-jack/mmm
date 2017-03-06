/**
 * Created by Administrator on 2017.3.1.
 */
$(function () {
    $.ajax({
        url:'http://192.168.23.77:3000/api/getgsshop',
        dataType:'jsonp',
        success:function (data) {
            $('#shop').html(template('shopPlt',data));
        }
    });

    $.ajax({
        url:'http://192.168.23.77:3000/api/getgsshoparea',
        dataType:'jsonp',
        success:function (data) {
            $('#area').html(template('areaPlt',data));
        }
    })


    var shopId=0;
    var areaId=0;

    //初始渲染shopid和areaid都为0的数据
    ajaxList(shopId,areaId);

    /*选择超市，渲染页面*/
    $('#shop').on('change',function () {
        shopId=parseInt($('#shop option:selected').attr('id'));
        ajaxList(shopId,areaId);
    });

    /*选择地区，渲染页面*/
    $('#area').on('change',function () {
        shopId=parseInt($('#area option:selected').attr('id'));
        ajaxList(shopId,areaId);
    });

    function ajaxList(shopId,areaId) {
        $.ajax({
            url:'http://192.168.23.77:3000/api/getgsproduct',
            data:{shopid:shopId,areaid:areaId},
            dataType:'jsonp',
            success:function (data) {
                $('.mmm_section').html(template('listPlt',data));
            }
        })
    }

})