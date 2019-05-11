const default_settings = {
    name: "My Posts",
    posts: false
}
window.$iru = window.$iru || {};
const settings = {
    ...default_settings,
    ...window.$iru
};
const posts = [];
const regex = { //Some expressions, thought best to save it here
    title: /# .+/gm
}


document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML += "<div class='container'><div id='container' class='inner-container'></div></div>";
    const container = document.getElementById("container");
    if (settings.name) {
        container.innerHTML += `<div class='center-text' style='padding-top:20px;padding-bottom:20px;'><h1>${settings.name}</h1></div>`
    }
    if (settings.posts && Array.isArray(settings.posts) && settings.posts.length > 0) {
        for (let i = 0; i < settings.posts.length; i++) {
            let el = settings.posts[i];
            make_request(`${document.URL.substr(0,document.URL.lastIndexOf('/'))}/${el}.md`).then((res) => {
                let title = el;
                let titleReg = regex.title.exec(res);
                if (titleReg && titleReg[0]) {
                    res = res.replace(titleReg[0], "");
                    title = titleReg[0].replace("# ", "");
                }
                if (res.length <= 0) {
                    res = "Nothing's been written here...";
                }
                posts.push({
                    title: title,
                    content: res
                });
                container.innerHTML += `<div class='card'><h1>${title}</h1><p>${res}</p></div>`
            }).catch((err) => {
                console.error("Error loading post content", err);
            });
        }
    } else {
        settings.posts = false;
    }

    if (!settings.posts) {
        container.innerHTML += `<div class='center not-found' style='flex-direction:column!important'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class='sad'><path d="M256 48C141.1 48 48 141.1 48 256c0 114.7 93.3 208 208 208 114.9 0 208-93.1 208-208 0-114.7-93.3-208-208-208zm-73.9 152.1c14.8-1.2 27 11.1 25.9 25.9-.9 11.6-10.3 21.1-22 22-14.8 1.2-27-11.1-25.9-25.9.9-11.7 10.3-21.1 22-22zm-.7 151.9c-11.5 0-19.3-11.8-14.7-22.4 15-34.5 49.2-58.6 89.3-58.6s74.2 24.1 89.3 58.6c4.6 10.6-3.1 22.4-14.7 22.4 0 0-34.7-4-73.1-4-38.5 0-76.1 4-76.1 4zm148.5-104.1c-14.8 1.2-27-11.1-25.9-25.9.9-11.6 10.3-21.1 22-22 14.8-1.2 27 11.1 25.9 25.9-.9 11.7-10.3 21.1-22 22z"/></svg><p>There's been no posts here, yet.</p></div>`
    }
});

const make_request = (url, method = "GET") => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}