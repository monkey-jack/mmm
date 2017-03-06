/**
 * Created by Administrator on 2017.2.25.
 */
$(function () {

    //获取地址栏的URL后面的参数
    var urlData = window.location.search.substring(1).split('=');

    //面包屑导航栏的数据的获取，并追加到相应的标签内
    $.ajax({
        url: 'http://192.168.23.25:3000/api/getcategorybyid',
        data: {categoryid: urlData[1]},
        dataType: 'jsonp',
        success: function (data) {
            $('#nav_list').html(data.result[0].category);
        }
    });


    /*初识化pageid，并转化id类型*/
    $.ajax({
        url: 'http://192.168.23.25:3000/api/getproductlist',
        data: {categoryid: urlData[1], pageid: pageid},
        dataType: 'jsonp',
        success: function (data) {
            // console.log(data);
            $('#goods_display').html(template('categroy_list', data));

            //动态添加select标签
            var page = Math.ceil(data.totalCount / data.pagesize);
            for (var i = 1; i <= page; i++) {
                //ES6 新语法，拼接字符串
                var option=`<option value=${i}>${i}/${page}</option>`;
                //将每次拼接的字符串追加到select后面
                $('#select').append(option);
            }

            /*给select标签选择注册事件*/
            $('select').change(function () {
                ajaxList(pageid);
                $('#select').val(pageid);
            });

            /*上一页注册事件*/
            $('#previous_page').on('click', function () {
                pageid <= 1 ? pageid = 1 : pageid--;
                ajaxList(pageid);
                $('#select').val(pageid);
            });

            /*下一页注册事件*/
            $('#next_page').on('click', function () {
                pageid >= page ? pageid = page : pageid++;
                ajaxList(pageid);
                $('#select').val(pageid);
            })


        }
    })

    /*上一页或下一页或者页面选择跳转时，重新渲染页面。封装函数*/
    function ajaxList(pageid) {
        $.ajax({
            url: 'http://192.168.23.72:3000/api/getproductlist',
            data: {categoryid: urlData[1], pageid: pageid},
            dataType: 'jsonp',
            success: function (data) {
                $('#goods_display').html(template('categroy_list', data));
            }
        })
    }

});