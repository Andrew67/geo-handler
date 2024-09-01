"use strict";

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        maps: document.querySelector("#maps").value
    });
}

async function restoreOptions() {
    try {
        const result = await browser.storage.sync.get("maps");
        let selectedMaps = result.maps || "osm";
        // Pre v3 users may have selected Qwant Maps which no longer exists
        if (selectedMaps === "qwant") selectedMaps = "osm";
        document.querySelector("#maps").value = selectedMaps;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);