/**
 * Created by Administrator on 2017.2.28.
 */
$(function () {
    var productid=parseInt(window.location.search.replace('?productid=',''));

    var URL='';
    if(window.location.href.indexOf('inlanddiscountList')!=-1){
        URL='http://192.168.23.72:3000/api/getdiscountproduct';
    }else if(window.location.href.indexOf('moneyctrlList')!=-1){
        URL='http://192.168.23.72:3000/api/getmoneyctrlproduct';
    }

    $.ajax({
        url:URL,
        data:{productid:productid},
        dataType:'jsonp',
        success:function (data) {
            $('#sectionIntro').html(template('intro',data));
        }
    })
});