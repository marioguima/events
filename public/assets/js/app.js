! function(a) {
    "use strict";
    a(".dropdown-menu a.dropdown-toggle").on("click",
            function(t) {
                return a(this).next().hasClass("show") ||
                    a(this).parents(".dropdown-menu").first().find(".show").removeClass("show"),
                    a(this).next(".dropdown-menu").toggleClass("show"), !1
            }),
        a(function() {
            a('[data-toggle="tooltip"]').tooltip()
        }),
        a(function() {
            a('[data-toggle="popover"]').popover()
        }),
        a("#light-dark").on("click", function(t) {
            "disabled" !== a("#bootstrap-style").attr("disabled") ?
                (a("#bootstrap-dark-style").attr("disabled", !1),
                    a("#bootstrap-style").attr("disabled", !0),
                    a("#app-dark-style").attr("disabled", !1),
                    a("#app-style").attr("disabled", !0)) :
                (a("#bootstrap-dark-style").attr("disabled", !0),
                    a("#bootstrap-style").attr("disabled", !1),
                    a("#app-dark-style").attr("disabled", !0),
                    a("#app-style").attr("disabled", !1))
        }),
        Waves.init()
}(jQuery);