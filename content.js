/**
 * Created by mk on 12.02.16.
 */

$(document).ready(function() {
    $("body").append('<div id="selector-top">' +
        '</div><div id="selector-bottom"></div>' +
        '<div id="selector-left"></div>' +
        '<div id="selector-right"></div>');

    $("body").append('<div id="selector-overlay">' +
        '<h3>Данные</h3>' +
        '<p>' +
        '<label for="selector-active">Селектор активен</label>' +
        '<input type="checkbox" id="selector-active"/>' +
        '</p>' +
        '<p>' +
        '<span id="1"></span>' +
        '<span id="2"</span>' +
        '</p>' +
        '</div>');

    var selectors = {
        top: $('#selector-top'),
        left: $('#selector-left'),
        right: $('#selector-right'),
        bottom: $('#selector-bottom')
    };

    $(document).mousemove(function(event) {
        if(!$("#selector-active").is(':checked')) { return; }
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
    });

    $(document).click(function(event) {
        if(!$("#selector-active").is(':checked')) { return; }
        var $target = event.target;
        if ($target.id != "selector-active") {
            $("#selector-overlay #1").html(getSelectorSequence($target));
            (event.target).style.pointerEvents = 'none';
            return false;
        }
    });

    function getSelectorSequence(el){
      var names = [];
      while (el.parentNode){
          if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
          else {
              var className = "";
              if (el.className) className = "." + el.className.split(' ')[0];
              names.unshift(el.tagName + className );
          }
          el=el.parentNode;
      }
      return names.join(" ");
    }


});

