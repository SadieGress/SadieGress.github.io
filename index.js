import { loadTerminal, cowSay, version, changelog, helptext } from "./terminalCommands.js";

function useTerminal(text, textBox) {
    const cowsayLength = text.length > 7 ? text.length - 7 : 0;
    const escapedText = escapeHtml(text);
    pushToTerminal("KM:\\Kittmaus\\Home> " + escapedText, textBox)

    const query = escapedText.split(" ");

    switch(query[0].toLowerCase()) {
        case "help":
            pushToTerminal(helptext(), textBox)
            break;
        case "clear":
            textBox.innerHTML = ``;
            break;
        case "reset":
            loadTerminal(textBox);
            break;
        case "cowsay":
            query.splice(0,1);
            cowSay(query.join(" "), textBox, cowsayLength);
            break;
        case "version":
            pushToTerminal(version(query[1]), textBox);
            break;
        case "changelog":
            pushToTerminal(changelog(), textBox);
            break;
    }
    textBox.scrollTop = textBox.scrollHeight;
}

function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

function pushToTerminal(text, textBox) {
    textBox.innerHTML += `<br>${text}<br>`;
} 

let commandHistory = [];
let historyIndex = -1;

window.onload = function () {
    const terminalText = document.getElementById("terminalText");
    loadTerminal(terminalText);
    const terminalSearch = document.getElementById("terminalsearch")
    terminalSearch.addEventListener("keydown", function(event) {
        console.log(historyIndex);
        if (event.key == "Enter") {
            const searchText = terminalSearch.value.trim();
            commandHistory.push(searchText);
            historyIndex = commandHistory.length;
            useTerminal(searchText, terminalText);
            terminalSearch.value = "";
        } else if (event.key == "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                terminalSearch.value = commandHistory[historyIndex];
            }
            event.preventDefault();
        } else if (event.key == "ArrowDown") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalSearch.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalSearch.value = "";
            }
            event.preventDefault();
        }
    });
}