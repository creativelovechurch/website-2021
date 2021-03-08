/*
 * common.js
 * ---
 * @author not you
 * ---
 * ---------------------------------------------
 * (c) me
 * ---------------------------------------------
 */
(function ($) {

    var $images = $('#images li');
    var $title = $('#site-name');

    var timer = subTimer = null;
    var numImages = $images.length
    var current = Math.floor(Math.random() * numImages);
    var INTERVAL = 5000;


    var title = $title.text();
    var typo_delay = [
        12, // 1 C
        12, // 2 R
        14, // 3 E
        2, // 4 A
        8, // 5 T
        4, // 6 I
        5, // 7 V
        15, // 8 E
        12, // 9 
        16, //10 L
        9, //11 O
        20, //12 V
        15, //13 E
        17, //14 
        2,  //15 C
        19,  //15 H
        13,  //15 U
        9,  //15 R
        18,  //15 C
        10  //15 H
    ]

    $title.html('');
    $.each(title.replace(/[\t\s]/g, '').split(''), function (i, c) {
        var $s = $('<span class="c' + (i + 1) + '">' + c + '</span>');
        var d = typo_delay[i]
        $s.css(Modernizr.prefixedCSS('transition-delay'), (d / 30) * 1000 + 'ms')
        $title.append($s);
    });


    $images.each(function () {
        var $img = $(this).find('img');
        $(this).css({
            'background-image': 'url(' + $img.attr('src') + ')'
        });
        $img.css('display', 'none');
    });

    function start() {
        timer = setTimeout(function () {
            var old = current;
            $images.eq(old).addClass('hide');
            subTimer = setTimeout(function () {
                $images.eq(old).removeClass('current hide');
            }, 2200)
            current = getRandomNext();
            $images.eq(current).addClass('current');

            start();

        }, INTERVAL);
    }

    function stop() {
        clearTimeout(timer);
        clearTimeout(subTimer);
    }

    function getRandomNext() {
        var n = Math.floor(Math.random() * numImages);
        if (n == current) {
            while (n == current) {
                n = Math.floor(Math.random() * numImages);
            }
        }
        return n;
    }


    function addEvents() {
        $('#scroll-info a').on('click.index', function (e) {
            $(document).off('mousewheel.index touchmove.index');
            stop();
        })

        $(document).on('mousewheel.index touchmove.index', function (e) {
            $(document).off('mousewheel.index touchmove.index');
            bq.page.show($('#scroll-info a').attr('href'));
        });
    }

    function removeEvents() {
        $('#scroll-info a').off('click.index');
        $(document).off('mousewheel.index touchmove.index');
    }

    var init_timers = []
    $(window).one('enter.page.bq', function () {

        init_timers[init_timers.length] = setTimeout(function () {
            $title.addClass('show');
        }, 0);

        init_timers[init_timers.length] = setTimeout(function () {
            $images.eq(current).addClass('current');
            start();
        }, 800);

        init_timers[init_timers.length] = setTimeout(function () {
            $('#scroll-info').addClass('show');
        }, 1300);

        init_timers[init_timers.length] = setTimeout(addEvents, 2000);
    }).one('exit.page.bq', function () {
        removeEvents();
        stop();
        for (var i = init_timers.length - 1; i >= 0; i--) {
            clearTimeout(init_timers[i]);
        }
    })



})(jQuery)