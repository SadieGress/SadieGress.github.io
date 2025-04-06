export function loadTerminal(textBox) {
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

export function cowSay(text, textBox, cowsayLength) {
    if (text.length === 0) text = "...";
    textBox.innerHTML += `
    <pre>
      ${"=".repeat(cowsayLength)}
    | ${text} |
      ${"=".repeat(cowsayLength)}
           \\
            \\
              ^__^
              (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||</pre>`
}

let versionMap = {
    "1.0.2":`
    - Specific version search<br>
    - Changelog (and command)<br>
    - Arrow up/down in terminal possible<br>
    - Cowsay now has a corrected width<br>
    - Moved around where terminal functions are stored
    `,
    "1.0.1":`
    - Terminal scrolling/text entry<br>
    - help, clear, reset, version, and cowsay commands.`
}

export function version(ver=Object.keys(versionMap)[0]) {
    if (versionMap[ver] !== undefined){
        const formattedVer = `
        <strong>Version ${ver}</strong><br>
        ---------------------------------------------------<br>
        ${versionMap[ver]}
        <br>---------------------------------------------------
        `;
        return formattedVer;
    } else {
        return `That's not a version that exists. The current version is ${Object.keys(versionMap)[0]}.`;
    }
}

export function changelog() {
    let output = ""
    for (const ver of Object.keys(versionMap)) {
        output += `---------------------------------------------------<br><strong>${ver}</strong><br>${versionMap[ver]}<br>`;
    }
    output += "---------------------------------------------------";
    return output;
}

export function helptext() {
    return `<strong>Commands</strong>:<br>
    help: shows this text.<br>
    clear: clear the terminal.<br>
    reset: reset terminal to initial display.<br>
    version [version]: show current or specific site version.<br>
    changelog: show site version history.<br>
    cowsay [text]: moo!
    `
}