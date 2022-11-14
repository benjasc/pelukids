$(document).ready(function () {
    $(".shade-li").click(function () {
        if (!$(this).hasClass("shade")) {
            $(".shade-li").each(function (i, obj) {
                if ($(obj).hasClass("shade")) {
                    $(obj).removeClass("shade");
                }
            });
            $(this).addClass("shade");
        }
    });
});