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
        '<span id="1"></span>' +
        '<span id="2"</span>' +
        '</div>');

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
        var $target = event.target;
        console.log(fullPath($target));
        $("#selector-overlay #1").html(fullPath($target));

        (event.target).style.pointerEvents = 'none';
        chrome.runtime.sendMessage({type: "msgTarget", trgt: "hello"});


        return false;

    });

    function fullPath(el){
      var names = [];
      var className = "";
      while (el.parentNode){
          if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
          else {
              for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++) {
                  className = "";
                  if (el.className) className = "." + el.className.className.split(' ')[0];
                  names.unshift(el.tagName + className );
              }

          }
          el=el.parentNode;
      }
      return names.join(" > ");
    }


});

