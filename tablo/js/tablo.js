$(function() {

    $('td.cell, th.cell').hover(function() {
        var td = $(this);
        var columnClass = td.attr('class').replace(/.*(column__\w+).*/, '$1');
        var rowClass = td.parent().attr('class').replace(/.*(row__\w+).*/, '$1');
        $('.cell.' + columnClass + ', .' + rowClass + ' td').toggleClass('cell__highlighted');
    });


    $(window).resize(function() {
        var width = $(this).width();
        if (width >= 1000) {
            $('table.tablo').removeClass('size-s').removeClass('size-m').addClass('size-l');
        } else if (width >= 800) {
            $('table.tablo').removeClass('size-s').removeClass('size-l').addClass('size-m');
        } else {
            $('table.tablo').removeClass('size-m').removeClass('size-l').addClass('size-s');
        }

    });

});
