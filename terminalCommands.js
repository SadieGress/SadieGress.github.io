export function loadTerminal(textBox) {
    textBox.innerHTML = `
    <br>
    Welcome to Kittmaus.rip! Feel free to visit any of the following links:<br><br>
    <a href="/art">[ART]</a><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[MEDIA BLOG]</a><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[WRITING]</a><br>
    <a href="https://www.youtube.com/watch?v=i1-kt7fyl84" target="_blank">[FISHING MINIGAME]</a><br><br>
    Or use the search bar below.<br>
    (Type "help" for commands!)<br><br>
    ==========------------------------------------------------==========<br>
    `;
}

export function cowSay(text, textBox, cowsayLength) {
    text.splice(0,1)
    text = text.join(" ")
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
    "1.0.3":`
    - Updated about background/text colors<br>
    - setcolor command<br>
    - Added an awesome easter egg ;)`,
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

export function setColor(r="127", g="255", b="212"){
    if (r === "awesome") {
        document.body.style.animation = `rainbow 6s linear 0s infinite`;
    }
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255){
        document.body.style.animation = "none";
        document.body.style.color = `rgb(${r}, ${g}, ${b})`;
    }
}

export function helptext() {
    return `<strong>Commands</strong>:<br>
    help: shows this text.<br>
    clear: clear the terminal.<br>
    reset: reset terminal to initial display.<br>
    version [version]: show current or specific site version.<br>
    changelog: show site version history.<br><br>
    cowsay [text]: moo!<br>
    setcolor [r g b]: sets site font color.
    `
}