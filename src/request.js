module.exports = (url, method = "GET") => {
    return new Promise((resolve, reject) => {
        let loading = document.getElementById("loading");
        loading.classList.add("loading-active");
        let loading_bar = document.getElementById("loading-bar");
        loading_bar.style.width = "0%";
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onprogress = (e) => {
            if (e.lengthComputable) {
                let percent = (e.loaded / e.total) * 100;
                if (percent == 100 || percent > 100) {
                    setTimeout(() => {
                        loading.classList.remove("loading-active");
                    }, 500); //after 0.5 second. transistion ends then.
                }
                if (loading_bar) {
                    loading_bar.style.width = `${percent}%`;
                }
            }

        }
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
            console.error(url)
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}