const regex = { //Some expressions, thought best to save it here
    title: /# .+/gm
}

module.exports = (content, title, length) => {
    let titleReg = regex.title.exec(content);
    if (titleReg && titleReg[0]) {
        content = content.replace(titleReg[0], "");
        title = titleReg[0].replace("# ", "");
    }
    if (content.length <= 0) {
        content = "Nothing's been written here...";
    }
    if (content.length > length) {
        content = content.substr(0, length) + "..."
    }
    return {
        title: title,
        content: content
    };
}