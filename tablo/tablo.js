$(function() {

    $('td.cell, th.cell').hover(function() {
        var td = $(this);
        var columnClass = td.attr('class').replace(/.*(column__\w+).*/, '$1');
        var rowClass = td.parent().attr('class').replace(/.*(row__\w+).*/, '$1');
        $('.cell.' + columnClass + ', .' + rowClass + ' td').toggleClass('cell__highlighted');
    });

    $('td.cell').click(function() {
        var tr = $(this).parent();
        alert(
            'Тип рейса: ' + (tr.hasClass('flight_from') ? 'вылет' : 'прилёт') + '\n' +
            'Номер рейса: ' + tr.find('.column__flight_number.size-l').text() + '\n' +
            'Авиакомпания: ' + tr.find('.column__airline.size-l').text() + '\n' +
            'Тип судна: ' + tr.find('.column__plain_type.size-l').text() + '\n' +
            'Аэропорт назначения: ' + tr.find('.column__airport_to.size-l').text() + '\n' +
            'Плановое время: ' + tr.find('.column__landing_time.size-l').text() + '\n' +
            'Статус: ' + tr.find('.column__status.size-l').text() + '\n' +
            'Примечание: ' + tr.find('.column__comments.size-l').text()
        );
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

    var header = $('table.tablo thead');
    var headerTop = header.offset().top;
    $(window).scroll(function() {
        header.toggleClass('fixed', $(window).scrollTop() > headerTop);
    });

    $('#show_flight_from').click(function() {
        $('table.tablo').toggleClass('show_from');
    });

    $('#show_flight_to').click(function() {
        $('table.tablo').toggleClass('show_to');
    });

});
