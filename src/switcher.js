// const make_request = require("./request");
window.render_client = require("./renderClient");
const marked = require("marked");
module.exports = (to, title, index) => {
    document.title = title; //firefox ignores the title property on pushstate so
    let container = document.getElementById("container");
    window.$iru.prev = {
        content: container.innerHTML,
        title: document.getElementsByTagName("title")[0].innerHTML || "Posts",
        path: window.location.href
    };
    let withHash = to;
    if (window.$iru) {
        if (window.$iru.hash) {
            withHash = `#${to}`;
        }
    }
    history.pushState({}, title, withHash);
    window.backHome = () => {
        let container_reget = document.getElementById("container");
        container_reget.innerHTML = String(window.$iru.prev.content);
        history.pushState({}, window.$iru.prev.title, window.$iru.prev.path);
    }
    let formatted_content = marked(window.$iru.postContent[index].content);
    container.innerHTML = `<p class="clickable" onclick="backHome()" style="margin-top: 60px;font-size: 12px;margin-bottom: 4px;">Back home</p><div class='card' ><h1>${title}</h1><div style="line-height:1.2">${formatted_content}</div></div>`;
}