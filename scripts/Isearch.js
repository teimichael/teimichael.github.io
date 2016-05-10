/**
 * Created by lenovo on 2016/4/21.
 */

// $("#search").on('input', function () {
//     var value = $(this).val();
//     var valueLength = value.length;
//     var $li = $(".list-group-item");
//
//     if (valueLength == 0) {
//         $li.removeClass("active").show();
//     }
//
//     $li.each(function (index, element) {
//         var liText = $(this).text().substr(0, 1);
//         if (value == liText || value == liText.toLowerCase()) {
//             $(this).addClass("active").siblings().hide();
//         }
//     });
//
//     var $liActive = $(".list-group-item.active");
//     $liActive.each(function (index, element) {
//         $(this).show();
//     })
// });

$('#search').jSearch({
    selector: 'ul',
    child: 'li',
    minValLength: 0,
    Found: function (elem) {
        $(elem).show();
    },
    NotFound: function (elem) {
        $(elem).hide();
    },
    After: function (t) {
        if (!t.val().length) $('ul li').show();
    }
});