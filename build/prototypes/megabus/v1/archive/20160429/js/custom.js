var i = 0;
var j;
var widthDate;


var cellContents = [];

for (var i = 0; i < 170; i++) {
    var numberIsInArray = false;
    var rand = generateRandomNumb(1, 12);
    cellContents.push("£" + rand);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function generateRandomNumb(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function destination() {
    $(".popover.dest").toggleClass("show");
}

function filters() {
    $(".popover.filters").toggleClass("show");
}

function dateSingle(e) {
    $("#calendar").addClass("single").removeClass("double");
    $(".popover.date").toggleClass("show");
    if ($(e).hasClass("close")) {
        $.datepicker._clearDate('#calendar');
        $('#calendar').datepicker('setDate', null);
    }
    if ($("tr:has(td.ui-state-disabled)").length > 6) {
        $(this).css("display", "none");
    }
    var widthDate = $(".ui-datepicker td a").width();
    $(".ui-datepicker td a, .ui-state-highlight").height(widthDate);
}

function dateDouble(e) {
    $("#calendar").addClass("double").removeClass("single");
    $(".popover.date").toggleClass("show");
    if ($(e).hasClass("close")) {
        $.datepicker._clearDate('#calendar');
        $('#calendar').datepicker('setDate', null);
    }
    if ($("tr:has(td.ui-state-disabled)").length > 6) {
        $(this).css("display", "none");
    }
    var widthDate = $(".ui-datepicker td a").width();
    $(".ui-datepicker td a, .ui-state-highlight").height(widthDate);
}

function removeTodayHighlighting() {
    $('.ui-datepicker td').removeClass(" ui-datepicker-current-day, date-range-selected, ui-datepicker-current-day");
}


function time() {
    var card = $(".cards ul li").height() - 85;
    $(".cards ul li").css("margin-top", -card);
    $(".cards ul li:last-of-type").css("margin-bottom", -card);
    $(".popover.time").toggleClass("show");
    setTimeout(function () {
        $(".popover.time .overscroll").css("opacity", "1");
    }, 2000);
}

function locate() {
    $(".geoloc").toggleClass("locateme");
    setTimeout(function () {
        $(".departure p").html("London").css("color", "#716ad0");
    }, 2000);
}

function expand(e) {
    e.closest(".accordion").toggleClass("expand");
    if (e.closest(".accordion").is(".expand")) {
        e.html("Less options")
    } else {
        e.html("More options")
    }
}


function updateDatePickerCells(dp) {
    setTimeout(function () {

        $('.ui-datepicker td > *').each(function (idx, elem) {
            var value = cellContents[idx + 1] || 0;
            var className = 'datepicker-content-' + CryptoJS.MD5(value).toString();

            if (value == 0)
                addCSSRule('.ui-datepicker td a.' + className + ':after {content: "\\a0";}'); //&nbsp;
            else
                addCSSRule('.ui-datepicker td a.' + className + ':after {content: "' + value + '";}');

            $(this).addClass(className);
        });
    }, 0);
}
var dynamicCSSRules = [];

function addCSSRule(rule) {
    if ($.inArray(rule, dynamicCSSRules) == -1) {
        $('head').append('<style>' + rule + '</style>');
        dynamicCSSRules.push(rule);
    }
}

var divs = $('.datepicker');
var cards = $('.cards ul li');
$(".popover.time .overscroll").on('scroll', function () {
    var st = $(this).scrollTop();
    divs.css({
        'opacity': (1 - st / 25)
    });
});

$(".cards ul li:last-of-type").on('click', function () {
    $("body").css("pointer-events", "none");

    $(".popover.time .overscroll").animate({
        scrollTop: $(".cards")[0].scrollHeight
    }, 500);

});

$(document).ready(function () {

    var windowSize = $(document).width() / 2;
    var numbelement = $(".cards ul li").length;

    $.datepicker._defaults.onAfterUpdate = null;
    var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function (inst) {
        datepicker__updateDatepicker.call(this, inst);
        var onAfterUpdate = this._get(inst, 'onAfterUpdate');
        if (onAfterUpdate)
            onAfterUpdate.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
    }
    $(function () {
        var cur = -1
            , prv = -1;
        $('#calendar')
            .datepicker({
                numberOfMonths: 4
                , changeMonth: false
                , weekHeader: false
                , dayNames: false
                , firstDay: 1
                , minDate: 0
                , changeYear: false
                , showButtonPanel: true
                , beforeShowDay: function (date) {
                    if ($("#calendar").is(".single")) {
                        console.log("test")
                        return [true, ((date.getTime() == cur) ? 'date-range-selected' : '')];
                    } else {
                        return [true, ((date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
                    }
                }
                , onSelect: function (dateText, inst, dp) {
                    var d1, d2;
                    prv = cur;
                    cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                    if (prv == -1 || prv == cur) {
                        prv = cur;
                        $('#jrange input').val(dateText);
                    } else {
                        d1 = $.datepicker.formatDate('mm/dd/yy', new Date(Math.min(prv, cur)), {});
                        d2 = $.datepicker.formatDate('mm/dd/yy', new Date(Math.max(prv, cur)), {});
                        if ($("#calendar").is(".single")) {
                            $('#jrange input.singleB').val(d2);
                        } else {
                            $('#jrange input.singleB').val(d1);
                            $('#jrange input.returnB').val(d2);
                        }
                    }
                }
                , onAfterUpdate: function (inst, dp) {
                    var widthDate = $(".ui-datepicker td a").width();
                    $(".ui-datepicker td a, .ui-state-highlight").height(widthDate);
                    if ($("#calendar").is(".double")) {
                        if ($('.date-range-selected').length === 1) {
                            $('body').find('.date-range-selected:last a').css({
                                'border-top-right-radius': '0%'
                                , 'border-bottom-right-radius': '0%'
                            });
                        } else {
                            $('.date-range-selected').removeClass("noextendstart");
                            $('body').find('.date-range-selected:last a').css({
                                'border-top-right-radius': '50%'
                                , 'border-bottom-right-radius': '50%'
                            }).parent().addClass("noextendstart");
                        }
                        $('.date-range-selected').removeClass("noextendend");
                        $('body').find('.date-range-selected:first a').css({
                            'border-top-left-radius': '50%'
                            , 'border-bottom-left-radius': '50%'
                        }).parent().addClass("noextendend");

                        $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                            .appendTo($('#calendar .ui-datepicker-buttonpane'));
                    }
                    updateDatePickerCells();
                }
            })
            .datepicker("setDate", null)
            .position({
                my: 'left top'
                , at: 'left bottom'
                , of: $('#jrange input')
            })
            .hide();
        updateDatePickerCells();
        $('#jrange input').on('focus', function (e) {
            var v = this.value
                , d;
            try {
                if (v.indexOf(' - ') > -1) {
                    d = v.split(' - ');
                    prv = $.datepicker.parseDate('mm/dd/yy', d[0]).getTime();
                    cur = $.datepicker.parseDate('mm/dd/yy', d[1]).getTime();
                } else if (v.length > 0) {
                    prv = cur = $.datepicker.parseDate('mm/dd/yy', v).getTime();
                }
            } catch (e) {
                cur = prv = -1;
            }
            $('#calendar').datepicker('refresh').show();
            if (cur > -1) {
                $('#calendar').datepicker('setDate', new Date(cur));
                console.log("1");
            } else {
                $('#calendar').datepicker('setDate', null).find(".date-range-selected").removeClass("date-range-selected, ui-datepicker-current-day");
                removeTodayHighlighting();
                console.log("2");
            }
            widthDate = $(".ui-datepicker td a").width();
            $(".ui-datepicker td a,.ui-state-highlight").height(widthDate);
        });
    });


    $(".results").on("click", '#theone', function () {
        var theone = $(this).find("p").html();
        $(".destination p").html(theone);
        $(".popover.dest").toggleClass("show");
        $("body").scrollTop(0);
        $(".jumbotron").addClass("move");
        $('div[role="main"]').css({
            "opacity": "0"
            , "height": "0"
            , "margin": "0"
        });
        $('div[role="secondary"]').css({
            "opacity": "1"
            , "height": "auto"
            , "display": "block"
        });

    });
    $('.onoffswitch').on("click", function () {
        if ($('.onoffswitch-checkbox').is(':checked')) {
            $('.onoffswitch-label').html("Yes");
            $('.onoffswitch-label').css("padding-left", "13px");

        } else {
            $('.onoffswitch-label').html("No");
            $('.onoffswitch-label').css("padding-left", "39px");
        }
    });

    $('.toggle .element').on("click", function () {
         $('.btn-default.half:nth-of-type(1)').val('');
        $.datepicker._clearDate('#calendar');
        $('#calendar').datepicker('setDate', null);
        if ($(this).is(".right")) {
            $(this).parent().find(".left").css("color", "#ccc");
            $(this).css("color", "#fff");
            $(this).parent().find(".switch").css("transform", "translate(100%, -100%)");
            $(".box .btn:nth-of-type(2), .box .btn:nth-of-type(2) + label").css({
                "opacity": 1
                , "pointer-events": "all"
                , "display": "block"
            });
            $(".box .btn:nth-of-type(1)").css({
                "position": "absolute"
            });

        } else {
            $(this).parent().find(".right").css("color", "#ccc");
            $(this).css("color", "#fff");
            $(this).parent().find(".switch").css("transform", "translate(0, -100%)");
            $(".box .btn:nth-of-type(2), .box .btn:nth-of-type(2) + label").css({
                "opacity": 0
                , "pointer-events": "none"
                , "display": "none"
            });
            $(".box .btn:nth-of-type(1)").css({
                "position": "relative"
            });
        }
    });

    $('.cards ul li').on("click", function () {
        $(this).toggleClass("current");
        $(this).next().toggleClass("push");
    });

    $('.cards ul li').each(function () {
        $(this).css({
            "z-index": i
        });
        $(this).attr('data-info', 1);
        i++;
    });

    $("ul.datepicker").on("click", "li.previous", function () {
        var $this = $(this);
        var width = $this.width();
        var numberCards = $(".datepicker li").length;
        var cardSize = $(".datepicker li:nth-of-type(2)").width();
        var positionCard = cardSize * $this.index() - cardSize;
        $("ul.datepicker").animate({
            scrollLeft: positionCard
        }, 150);
    });

    $("ul.datepicker").on("click", "li.next", function () {
        var $this = $(this);
        var offset = $this.offset();
        var width = $this.width();
        var numberCards = $(".datepicker li").length;
        var cardSize = $(".datepicker li:nth-of-type(2)").width();
        var positionCard = cardSize * $this.index() - cardSize;
        $("ul.datepicker").animate({
            scrollLeft: positionCard
        }, 500);
    });

    $("body").on("click", '.ui-datepicker-close', function () {
        dateSingle();
    });

    $("#slider-range").slider({
        range: true
        , min: 0
        , max: 24
        , values: [0, 24]
        , slide: function (event, ui) {
            if (ui.values[0] < 10) {
                $("#start").val("0" + ui.values[0] + ":00");
            } else {
                $("#start").val(ui.values[0] + ":00");
            }

            if (ui.values[1] < 10) {
                $("#end").val("0" + ui.values[1] + ":00");
            } else {
                $("#end").val(ui.values[1] + ":00");
            }
        }
    });
    $("#start").val("0" + $("#slider-range").slider("values", 0) + ":00");
    $("#end").val($("#slider-range").slider("values", 1) + ":00");

});

$(".datepicker").scroll(function () {
    $(".cards").css("opacity", "0");
    $(".cards ul li").removeClass("current push");
    $(".datepicker li").each(function () {
        if (isElementInViewport(this)) {
            $(this).addClass("highlight");
            $(this).next().addClass("next");
            $(this).prev().addClass("previous");
        } else {
            $(this).removeClass("highlight");
            $(this).next().removeClass("next");
            $(this).prev().removeClass("previous");
        }
    })
    clearTimeout($.data(this, "scrollCheck"));
    $.data(this, "scrollCheck", setTimeout(function () {
        $(".cards").css("opacity", "1");
    }, 250));
});

$(".menu").scroll(function () {
    $(".results").css({
        "opacity": "0"
        , "pointer-events": "none"
    });
    $(".menu li").each(function () {
        if (isElementInViewport(this)) {
            $(this).addClass("highlight");
            $(this).next().addClass("next");
            $(this).prev().addClass("previous");

            $(".results:nth-of-type(" + $(this).index() + ")").css({
                "opacity": "1"
                , "pointer-events": "all"
            });
        } else {
            $(this).removeClass("highlight");
            $(this).next().removeClass("next");
            $(this).prev().removeClass("previous");
        }
    })
    clearTimeout($.data(this, "scrollCheck"));
    $.data(this, "scrollCheck", setTimeout(function () {
        $(".sfgd").css("opacity", "1");
    }, 250));
});

function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}