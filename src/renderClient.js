const marked = require("marked");
module.exports = (reset = false) => {
    var default_settings = {
        name: "My Posts",
        posts: false,
        preview_length: 256,
        hash: false,
        root: "/"
    }
    window.$iru = window.$iru || {};
    window.$iru.postContent = [];
    var settings = {
        ...default_settings,
        ...window.$iru
    };
    var regex = { //Some expressions, thought best to save it here
    }

    var make_request = require("./request");
    var get_content = require("./getContent");
    window.switcher = require("./switcher");

    var load = (reset = false) => {
        if (reset) {
            document.body.innerHTML = "<div class='loading' id='loading'><div class='loading-bar' id='loading-bar'></div></div><div class='container'><div id='container' class='inner-container'></div></div>";
        }

        let container = document.getElementById("container");
        if (settings.name) {
            container.innerHTML += `<div class='center-text' style='margin-top:20px;margin-bottom:20px;'><h1>${settings.name}</h1></div>`
        }
        if (settings.posts && Array.isArray(settings.posts) && settings.posts.length > 0 && !settings.static) {
            for (let i = 0; i < settings.posts.length; i++) {
                let el = settings.posts[i];
                make_request(`${document.URL.substr(0,document.URL.lastIndexOf('/'))}/${el}.md`).then((res) => {
                    let content = get_content(res, el, settings.preview_length);
                    container.innerHTML += `<div class='card clickable' onclick="switcher('${content.slug}', '${content.title}', '${content.index}')"><h1>${content.title}</h1><p>${content.content.replace(/#|\*|\`|\||\-|/g, "")}</p></div>`
                }).catch((err) => {
                    console.error("Error loading post content", err);
                });
            }
        } else {
            settings.posts = false;
        }

        if (!settings.posts) {
            container.innerHTML += ` < div class = 'center not-found'
                                style = 'flex-direction:column!important' > < svg xmlns = "http://www.w3.org/2000/svg"
                                viewBox = "0 0 512 512"
                                class = 'sad' > < path d = "M256 48C141.1 48 48 141.1 48 256c0 114.7 93.3 208 208 208 114.9 0 208-93.1 208-208 0-114.7-93.3-208-208-208zm-73.9 152.1c14.8-1.2 27 11.1 25.9 25.9-.9 11.6-10.3 21.1-22 22-14.8 1.2-27-11.1-25.9-25.9.9-11.7 10.3-21.1 22-22zm-.7 151.9c-11.5 0-19.3-11.8-14.7-22.4 15-34.5 49.2-58.6 89.3-58.6s74.2 24.1 89.3 58.6c4.6 10.6-3.1 22.4-14.7 22.4 0 0-34.7-4-73.1-4-38.5 0-76.1 4-76.1 4zm148.5-104.1c-14.8 1.2-27-11.1-25.9-25.9.9-11.6 10.3-21.1 22-22 14.8-1.2 27 11.1 25.9 25.9-.9 11.7-10.3 21.1-22 22z" / > < /svg><p>There's been no posts here, yet.</p > < /div>`
        }
        // setTimeout(() => {
        //     switcher("ran", "ran");
        // }, 1000);
    }

    if (reset) {
        load();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.body.innerHTML += "<div class='loading' id='loading'><div class='loading-bar' id='loading-bar'></div></div>";
        document.body.innerHTML += "<div class='container'><div id='container' class='inner-container'></div></div>";
        if (document.URL.substr(document.URL.lastIndexOf("/"), document.URL.length) && document.URL.substr(document.URL.lastIndexOf("/"), document.URL.length) != settings.root) {
            let path = document.URL.substr(document.URL.lastIndexOf("/"), document.URL.length);
            let isHash = path.match(/#.{1,}/);
            let file = path.replace("/", "").replace(".html", "");
            if (isHash) {
                file = isHash[0].substr(1, isHash[0].length);
            }
            make_request(`${document.URL.substr(0,document.URL.lastIndexOf('/'))}/${file}.md`).then((res) => {
                let container = document.getElementById("container");
                let content = get_content(res, file, settings.preview_length);
                let formatted_content = marked(content.content);
                window.backHome = () => {
                    load(true)
                }
                container.innerHTML = `<p class="clickable" onclick="backHome()" style="margin-top: 60px;font-size: 12px;margin-bottom: 4px;">Back home</p><div class='card' ><h1>${content.title}</h1><div style="line-height:1.2">${formatted_content}</div></div>`

            }).catch((err) => {

                load();
            });
        } else {
            load();
        }
    });
}