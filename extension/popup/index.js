const toast = new Toast(".toast");

document.addEventListener('DOMContentLoaded', function () {
    // Offline mode checkbox
    if (!settings.offlineDocPath) {
        // If the offline doc path not exists, turn off the offline mode.
        settings.isOfflineMode = false;
    }
    const offlineModeCheckbox = document.getElementById('offline-mode');
    const checkedState = settings.isOfflineMode;
    offlineModeCheckbox.checked = checkedState;
    toggleOfflinePathEnableState(checkedState);
    offlineModeCheckbox.onchange = function (event) {
        const checked = event.target.checked;
        settings.isOfflineMode = checked;
        toggleOfflinePathEnableState(checked);
    };

    // Offline doc path
    const offlineDocPath = document.querySelector('.offline-doc-path');
    offlineDocPath.value = settings.offlineDocPath;
    offlineDocPath.onchange = function (event) {
        let path = event.target.value;
        // Check the std doc path validity
        if (settings.checkDocPathValidity(path)) {
            settings.offlineDocPath = path;

            toast.success("Great! Your local doc path is valid!");
        } else {
            // If the offline doc path is invalid, turn off the offline mode.
            offlineModeCheckbox.checked = false;
            toast.error("Invalid local doc path.");
        }
        toast.dismiss(3000);
    };
}, false);


function toggleOfflinePathEnableState(enable) {
    const offlineDocPath = document.querySelector('.offline-doc-path');
    if (enable) {
        offlineDocPath.classList.remove('disable');
        offlineDocPath.classList.add('enable');
    } else {
        offlineDocPath.classList.remove('enable');
        offlineDocPath.classList.add('disable');
    }
}