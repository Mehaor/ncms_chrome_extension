$(document).ready(function() {

    try {
        chrome.storage.local.get("activated", function(result) { setWindowValues(result.activated); });
        chrome.storage.local.get("block", function(result) { setBlockData(result.block); });
    }
    catch (e) { }

    $("#buttonActivated").click(function() {
        chrome.runtime.sendMessage({task: "toggleActivated"}, function(response) {
            setWindowValues(response.activated);
        })
    });

    function setWindowValues(isActivated) {
        if (isActivated) {
            $("#buttonActivated").text("Deactivate");
            $("#textActivated").text("Activated");
        }
        else {
            $("#buttonActivated").text("Activate");
            $('#textActivated').text("Deactivated");
        }
    }

    function setBlockData(block) {
        if (block == null || block === undefined) return;
        $("#blockUrl").text(block.url);
        $("#blockContainerSequence").text(block.containerSequence);
        //$("#blockChildElements").text(block.childElements);
        $("#blockSuggestedInfoLink").html(block.suggestedInfo.link.href + "<p>" +
            block.suggestedInfo.link.sequence + "<p>" +
            block.suggestedInfo.link.textLink
        );
        $("#blockSuggestedInfoTitle").html(block.suggestedInfo.title.sequence + "<p>" +
            block.suggestedInfo.title.textTitle
        );
    }

    $("#buttonSave").click(function() {
        if (block == null || block === undefined) return;
        localStorage.setItem("ncmsParseOptions", block);
    });
});