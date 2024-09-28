////////// This script is for displaying various wood types on a single page
// website to open: https://www.holzvomfach.de/fachwissen-holz/holz-abc/
// just copy and paste into browser console, while having the webiste open
// website is in german

async function getSite(url) {
    let response = await fetch(url);
    let text = await response.text();

    let parser = new DOMParser();
    let el = parser.parseFromString(text, 'text/html');
    el.innerHTML = await text;

    // remove styling and
    el.querySelector("head")?.remove();
    el.querySelectorAll("script, style, link").forEach(e => e.remove());
    return el
}


function test() {
    let woodOverviewHTML = document.createElement('html');
    let woodOverviewBody = document.createElement('body')
    woodOverviewBody.classList.add("row");;


    function callback_on_end() {
        // apply styling and override html content
        console.log(woodOverviewBody)
        let styleEl = document.createElement('style')
        styleEl.innerText = ".row {--hvf-gutter-x: 30px;--hvf-gutter-y: 0;display: flex;flex-wrap: wrap;margin-left: calc(var(--hvf-gutter-x)*-.5);margin-right: calc(var(--hvf-gutter-x)*-.5);margin-top: calc(var(--hvf-gutter-y)*-1)}.col {flex: 1 0 0%;}";
        woodOverviewBody.appendChild(styleEl)
        woodOverviewHTML.appendChild(woodOverviewBody)
        document.documentElement.replaceWith(woodOverviewHTML);
    }


    // fetch figures of each wood type
    let counter = 0
    document.querySelectorAll("main .terms-wrapper li").forEach((el, _, array) => {
        let url = el.querySelector("a").href
        getSite(url).then(
            (siteEl) => {
                siteEl.querySelectorAll(".description figure").forEach((el) => {
                    woodOverviewBody.appendChild(el.parentElement)
                })
                counter += 1
                if (counter === array.length) {
                    callback_on_end()
                }
            }
        )
    })


}

test()