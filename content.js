/**
 * Created by mk on 12.02.16.
 */

$(document).ready(function() {
    $("body").append('<div id="selector-top">' +
        '</div><div id="selector-bottom"></div>' +
        '<div id="selector-left"></div>' +
        '<div id="selector-right"></div>');


    var selectors = {
        top: $('#selector-top'),
        left: $('#selector-left'),
        right: $('#selector-right'),
        bottom: $('#selector-bottom')
    };

    $(document).mousemove(function(event) {
        if(event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;
        var $target = event.target;
        var targetOffset = $target.getBoundingClientRect();

        selectors.top.css({
           "top": targetOffset.top -1,
            "left": targetOffset.left -1,
            "width": targetOffset.width + 3
        });

        selectors.bottom.css({
            "top": targetOffset.top + targetOffset.height + 1,
            "left": targetOffset.left -1,
            "width": targetOffset.width + 3
        });

        selectors.left.css({
            "top": targetOffset.top -1,
            "left": targetOffset.left -1,
            "height": targetOffset.height + 3
        });

        selectors.right.css({
            "top": targetOffset.top -1 ,
            "left": targetOffset.left + targetOffset.width + 1,
            "height": targetOffset.height +3
        });
        //console.log(targetOffset.top + " " + targetOffset.left);
    });

    $(document).click(function(event) {
        console.log(event.target);
        (event.target).style.pointerEvents = 'none';
        return false;
    });


});

