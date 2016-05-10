/**
 * Created by lenovo on 2016/4/21.
 */


$("#start").click(function () {
    var highlight = setInterval(highlightFunc, 1000);
    $("#stop").click(function () {
        clearInterval(highlight);
    });
});

function highlightFunc() {
    var $textarea = $("#codes");
    var codes = $textarea.val();
    var result = codes.replace(/`/g, "function(){");

    $textarea.val(result);
    console.log(result);
}

