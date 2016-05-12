/**
 * Created by lenovo on 2016/4/14.
 */
//Navigator effect
$(".nav li").click(function () {
    $(this).addClass("active")
        .siblings().removeClass("active");
});
