import { loadTerminal, cowSay, version, changelog, helptext, setColor } from "./terminalCommands.js";

function useTerminal(text, textBox) {
    const cowsayLength = text.length > 7 ? text.length - 7 : 0;
    const escapedText = escapeHtml(text);
    pushToTerminal("KM:\\Kittmaus\\Home> " + escapedText, textBox)

    const query = escapedText.split(" ");

    const searchMap = {
        "help": () => pushToTerminal(helptext(), textBox),
        "clear": () => textBox.innerHTML = ``,
        "reset": () => loadTerminal(textBox),
        "cowsay": () => cowSay(query, textBox, cowsayLength),
        "version": () => pushToTerminal(version(query[1]), textBox),
        "changelog": () => pushToTerminal(changelog(), textBox),
        "setcolor": () => setColor(query[1], query[2], query[3])
    }
    
    searchMap[query[0].toLowerCase()]();
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