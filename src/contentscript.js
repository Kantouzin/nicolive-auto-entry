(function() {
    var observer = new MutationObserver(
        (mutationRecords, observer) => {
            mutationRecords.forEach((record) => {
                if ("href" in record.target) {
                    window.open(record.target.href, "_blank");
                    observer.disconnect();
                }
            });
        }
    );

    const target = document.getElementById("premium_registration_gate_entrance");

    const options = {attributes: true, subtree: true};

    observer.observe(target, options);
}());
