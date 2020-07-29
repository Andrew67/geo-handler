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
        document.querySelector("#maps").value = result.maps || "qwant";
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);