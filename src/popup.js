(function () {
    var toggle_button = document.getElementById("setting-toggle");

    chrome.storage.local.get(
        "is_open_tab",
        (value) => {
            if (value.is_open_tab == null) {
                toggle_button.checked = false;
            } else {
                toggle_button.checked = value.is_open_tab;
            }
        }
    );

    toggle_button.addEventListener(
        "click",
        () => {
            chrome.storage.local.set({
                "is_open_tab": toggle_button.checked
            });

            var queryInfo = {
                "url": "http://live.nicovideo.jp/gate/*"
            };

            chrome.tabs.query(
                queryInfo,
                (result) => {
                    result.forEach(
                        (tab) => {
                            chrome.tabs.sendMessage(
                                tab.id, {
                                    "value": toggle_button.checked
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}());
