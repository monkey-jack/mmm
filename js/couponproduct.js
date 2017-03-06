/**
 * Created by Administrator on 2017.3.1.
 */
$(function () {

    var URLArr=window.decodeURI(window.location.search).substring(1).split('&');

    var newURLArr=[];
    for(var i=0;i<URLArr.length;i++){
        newURLArr.push(URLArr[i].split('='));
    }
    //动态生成顶部标题
    $('#couponTitle').html(newURLArr[1][1]+'优惠券');


    $.ajax({
        url:'http://192.168.23.25:3000/api/getcouponproduct',
        data:{couponid:newURLArr[0][1]},
        dataType:'jsonp',
        success:function (data) {
            $('.mmm_section').html(template('list',data));


            /*给每个列表盒子注册点击事件*/
            $('.listcoupon').on('click',function () {
                /*显示遮罩层*/
                $("#mask").css("height",$(document).height());
                $("#mask").css("width",$(document).width());
                $("#mask").show();

                /*点击隐藏遮罩层*/
                $("#mask").on('click',function () {
                    this.style.display='none';
                });


                /*通过id获取到下标，默认显示点击的照片*/
                //获取起始couponProductId，减去此值，即从0开始
                var startIndex=data.result[0].couponProductId;
                var index=parseInt(this.id)-startIndex;
                $("#img").html(data.result[index].couponProductImg);

                /*点击按钮显示上一张图片*/
                $("#btnLeft").on('click',function () {
                    index=(--index+data.result.length)%data.result.length;
                    $("#img").html(data.result[index].couponProductImg);
                    return false;//阻止冒泡
                });

                /*点击按钮显示下一张图片*/
                $("#btnRight").on('click',function () {
                    index=++index%data.result.length;
                    $("#img").html(data.result[index].couponProductImg);
                    return false;
                });

            });


        }
    })

})