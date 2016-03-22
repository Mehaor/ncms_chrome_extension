$(document).ready(function() {

    var activated = false;
    var block = {};

    try {chrome.storage.local.get("activated", function(result) { activated = result.activated });}
    catch (e) {}

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        activated = request.activated;
    });

    $("body").append('<div id="selector-top" class="selector-top blue">' +
        '</div><div id="selector-bottom" class="selector-bottom blue"></div>' +
        '<div id="selector-left" class="selector-left blue"></div>' +
        '<div id="selector-right" class="selector-right blue"></div>' +
        '<div id="selector-selected-top" class="selector-top red">' +
        '</div><div id="selector-selected-bottom" class="selector-bottom red"></div>' +
        '<div id="selector-selected-left" class="selector-left red"></div>' +
        '<div id="selector-selected-right" class="selector-right red"></div>'
    );

    var selectors = {
        top: $('#selector-top'), left: $('#selector-left'), right: $('#selector-right'), bottom: $('#selector-bottom')
    };

    var selectedSelectors = {
        top: $('#selector-selected-top'), left: $('#selector-selected-left'),
        right: $('#selector-selected-right'), bottom: $('#selector-selected-bottom')
    };

    $(document).mousemove(function(event) {
        if(!activated)  return;
        updateSelectorFrame(selectors, event.target);
    });

    function updateSelectorFrame(selectors, target) {
        var targetOffset = target.getBoundingClientRect();
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
    }

    $(document).click(function(event) {
        if(!activated)  return;
        var $target = event.target;

        updateSelectorFrame(selectedSelectors, $target);
        var containerSequence = getSelectorSequence($target);
        block = {
            "url": window.location.href,
            "containerSequence": containerSequence,
            "childElements": getChildElements($target, containerSequence)
        };
        chrome.runtime.sendMessage({task: "setBlockData", "block": block});

        return false;
    });

    function getChildElements(el, containerSequence) {
        var childElements = [];
        $(el).children().each(function(i) {
            var elementHtml = $(this).wrap('<p/>').parent().html();
            $(this).unwrap();
            childElements.push({
                "sequence": getSelectorSequence(this).replace(containerSequence + " ", ""),
                "element": elementHtml,
                "text": $(this).text()
            });
            childElements = childElements.concat(getChildElements(this, containerSequence));
        });
        return childElements;
    }

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

