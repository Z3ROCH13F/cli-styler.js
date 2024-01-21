function ln(x) {
    const line = {
        inline: "\x20",
        nline: "\n"
    };
    return line[x?.toLowerCase()];
}

module.exports = { ln };
