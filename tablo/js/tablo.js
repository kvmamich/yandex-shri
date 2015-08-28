$(function() {

    $('td.cell, th.cell').hover(function() {
        var td = $(this);
        var columnClass = td.attr('class').replace(/.*(column__\w+).*/, '$1');
        var rowClass = td.parent().attr('class').replace(/.*(row__\w+).*/, '$1');

        console.log(columnClass);
        console.log(rowClass);

        var highlighted = '.cell.' + columnClass + ', .' + rowClass + ' td';
        console.log(highlighted);
        $(highlighted).toggleClass('cell__highlighted');
    });

});
