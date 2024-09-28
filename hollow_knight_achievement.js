// This Script removes already done achievements on this achievment guide for hollow knight
// https://steamcommunity.com/sharedfiles/filedetails/?id=883989558
// just copy and paste
// NEED TO BE LOGGED IN

////////////// fetch done achievements //////////////
async function getSite(url) {
    let response = await fetch(url);
    let text = await response.text();
    let el = document.createElement('html');
    el.innerHTML = await text;
    el.querySelector("head").remove();
    el.querySelectorAll("body > script").forEach(e => e.remove());
    el.querySelectorAll("body > style").forEach(e => e.remove());
    el.querySelectorAll("body > link").forEach(e => e.remove());
    return el
}

let AchievementHTML = await getSite("https://steamcommunity.com/my/stats/367520?tab=achievements")
let already_done = []
var BreakException = {};

// add all done achievements to already_done[]
try {
    AchievementHTML.querySelectorAll("#personalAchieve > *").forEach(el => {
        if (el.nodeName == "BR") { throw BreakException };
        already_done.push(el.querySelector("h3").innerText)
    })
}

catch (e) {
    if (e !== BreakException) throw e;
}

////////////// filter achievements from guide //////////////

// remove each achievement from text
function removeAchievement(name) {
    [].slice.call(document.querySelectorAll("li b")).filter(el => { return el.innerText }).forEach((el) => {
        if (
            el.innerText === name) {
            el.parentElement.remove()
        }
    })
}
already_done.forEach(name => { removeAchievement(name) })

// remove unessery subsections
document.querySelectorAll(".subSection").forEach(el => {
    if (el.querySelector("li b")) {
        return
    }

    document.getElementById("GuideTableOfContents").querySelectorAll(".guideSubSectionSelectionLink").forEach(subel => {
        if (subel.innerText.includes(el.querySelector(".subSectionTitle").innerText)) {
            subel.remove()
        }
    })
    el.remove()
})
