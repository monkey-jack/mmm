/**
 * Created by Administrator on 2017.2.26.
 */
$(function () {

    $.ajax({
        url: 'http://192.168.23.72:3000/api/getmoneyctrl',
        data:{pageid:pageid},
        dataType:'jsonp',
        success: function (data) {
            console.log(data);
            $('#goods_display').html(template('goods', data));


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
    });

    /*上一页或下一页或者页面选择跳转时，重新渲染页面。封装函数*/
    function ajaxList(pageid) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getmoneyctrl',
            data: {pageid: pageid},
            dataType: 'jsonp',
            success: function (data) {
                $('#goods_display').html(template('goods', data));
            }
        })
    }

});