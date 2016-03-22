var activated = false;
var block = {};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.task == "toggleActivated") {
        activated = !activated;
        //chrome.storage.local.set({activated: activated});
        sendResponse({activated: activated});

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {activated: activated}, function(response) {});
        });
    }

    if (request.task == "setBlockData") {
        block = request.block;
    }
    chrome.storage.local.set({activated: activated, block: block});

});