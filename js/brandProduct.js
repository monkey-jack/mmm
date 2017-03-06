/**
 * Created by 伟 on 2017/3/1.
 */
(function () {
    var string = decodeURI(location.search);

    // console.log(string);
    var expNum = /(\d+)/g;

    var expStr = /([\u4e00-\u9fa5]+)/g;

    // console.log(string);
    var china = expStr.exec(string)[0];

    china = china.replace('十大品牌',"");

    var tag = "<p class='p'>"+china+"哪个牌子好</p>";
    var str = "<p class='p'>"+china+"产品销量排行</p>";
    var tagg = "<p class='p'>"+china+"最新评论</p>";

    // console.log(tag);
    $('.filtrate').after(tag);
    $('.list').after(tagg);
    $('.sell').after(str);

    var num = expNum.exec(string)[0]-0;
    $.ajax({
        // url:'http://mmb.ittun.com/api/getbrandtitle',
        url:'http://192.168.23.72:3000/api/getbrand',
        dataType:'json',
        data:{'brandtitleid':num},
        success:function (data) {
            var html = template('small', data);
            $('.list').html(html);
        }
    })
    $.ajax({
        // url:'http://mmb.ittun.com/api/getbrandtitle',
        url:'http://192.168.23.72:3000/api/getbrand',
        dataType:'json',
        data:{'brandtitleid':num},
        success:function (data) {
            var html = template('small', data);
            $('.list').html(html);
        }
    });
    $.ajax({
        // url:'http://mmb.ittun.com/api/getbrandtitle',
        url:'http://192.168.23.72:3000/api/getbrandproductlist',
        dataType:'json',
        data:{'brandtitleid':num},
        success:function (data) {
            var result = data.result;
            // id = result[0].productId
            result = result.splice(0,4);
            var da = {};
            da.result = result;
            var html = template('smal', da);
            $('.sell').html(html);
            //
            var res = result.splice(0 , 1)
            console.log(res);
            var dat = {res:res}
            console.log(dat);
            var htm = template('sma', dat);
            $('.deta').html(htm);
        }
    });
    $.ajax({
        // url:'http://mmb.ittun.com/api/getbrandtitle',
        url:'http://192.168.23.72:3000/api/getproductcom',
        dataType:'json',
        data:{'productid':1},
        success:function (data) {
            var html = template('sm', data);
            $('.deta .num').after(html);
        }
    });
})()