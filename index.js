function loadTerminal(textBox) {
    textBox.innerHTML = `
    <br>
    Welcome to Kittmaus.rip! Feel free to visit any of the following links:<br><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[ART]</a><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[MEDIA BLOG]</a><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[WRITING]</a><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[FISHING MINIGAME]</a><br><br>
    Or use the search bar below.<br>
    (Type "help" for commands!)<br><br>
    ==========------------------------------------------------==========<br>
    `;
}

function cowSay(text, textBox) {
    if (text.length === 0) text = "...";
    textBox.innerHTML += `
    <pre>
      ${"=".repeat(text.length)}
    | ${text} |
      ${"=".repeat(text.length)}
           \\
            \\
              ^__^
              (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||</pre>`
}

function useTerminal(text, textBox) {
    const escapedText = escapeHtml(text);
    pushToTerminal("KM:\\Kittmaus\\Home> " + escapedText, textBox)

    const query = escapedText.split(" ");

    switch(query[0].toLowerCase()) {
        case "help":
            pushToTerminal("<strong>Commands</strong>:<br>help: shows this text.<br>clear: clear the terminal.<br>reset: reset terminal to initial display.<br>version: show current site version (with changelogs).<br>cowsay &lt;text&gt;: moo!", textBox)
            break;
        case "clear":
            textBox.innerHTML = ``;
            break;
        case "reset":
            loadTerminal(textBox);
            break;
        case "cowsay":
            query.splice(0,1);
            cowSay(query.join(" "), textBox);
            break;
        case "version":
            pushToTerminal("<strong>Version 1.01</strong><br>----------------------------------------------<br>- Terminal scrolling/text entry<br>- help, clear, reset, version, and cowsay commands.<br>----------------------------------------------", textBox);
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

window.onload = function () {
    const terminalText = document.getElementById("terminalText");
    loadTerminal(terminalText);
    const terminalSearch = document.getElementById("terminalsearch")
    terminalSearch.addEventListener("keydown", function(event) {
        if (event.key == "Enter") {
            useTerminal(terminalSearch.value.trim(), terminalText);
            terminalSearch.value = "";
        }
    });
}