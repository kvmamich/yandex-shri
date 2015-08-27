$(function() {

    $('td.cell').hover(function() {
        var classes = $(this).attr('class');
        var columnClass = classes.replace(/.*(column__\w+).*/, '$1');
        var rowClass = classes.replace(/.*(row__\w+).*/, '$1');

        console.log(classes);
        console.log(columnClass);
        console.log(rowClass);

        $('.' + columnClass).toggleClass('cell__highlighted');
    });

});
