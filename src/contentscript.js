(function () {
    var is_open_tab;

    chrome.storage.local.get(
        "is_open_tab",
        (value) => {
            if (value.is_open_tab == null) {
                is_open_tab = false;
            } else {
                is_open_tab = value.is_open_tab;
            }
        }
    )

    var observer = new MutationObserver(
        (mutationRecords, observer) => {
            mutationRecords.forEach((record) => {
                if ("href" in record.target) {
                    if (is_open_tab) {
                        window.open(record.target.href, "_blank");
                    } else {
                        document.location.href = record.target.href;
                    }
                    observer.disconnect();
                }
            });
        }
    );

    const target = document.getElementById("premium_registration_gate_entrance");

    const options = {
        attributes: true,
        subtree: true
    };

    chrome.runtime.onMessage.addListener(
        (message, sender, sendResponse) => {
            is_open_tab = message.value;
            sendResponse();
        }
    );

    observer.observe(target, options);
}());
