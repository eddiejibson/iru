window.$iru.regex = { //Some expressions, thought best to save it here
    title: /# .+/
}

module.exports = (content, title, length) => {
    let originalTitle = title;
    let titleReg = window.$iru.regex.title.exec(content);
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

    let index = window.$iru.postContent.length || 0;

    if (index == 1) {
        index = 0;
    }

    let obj = {
        title: title,
        content: content,
        index: index,
        slug: originalTitle
    };

    window.$iru.postContent.push(obj);

    return obj;
}