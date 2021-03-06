/**
 * MANUAL ENTRY
 * */
let charStats = {}

const dentry = document.getElementById("data-entry")
Object.entries(hashlist)
    .sort(([aid, a], [bid, b]) => a.name.localeCompare(b.name))
    .forEach(([id, entry]) => {
        const row = document.createElement("tr")

        row.innerHTML = `
            <td>
                <figure>
                    <img class="table-img" id="img-${id}" onload="onImgLoad(this)" src="${getImageURL(id, 0)}" />
                    <figcaption>${entry.name}</figcaption>
                </figure
            </td>
            <td class="star-select"><input onchange="updateData(this)" type="number" min="0" max="6" value="0" id="stars-${id}" />\u2605</td>
            <td class="rank-select">R<input onchange="updateData(this)" type="number" min="0" max="20" value="1" id="rank-${id}" /></td>
            <td class="uelevel-select">Lv.<input onchange="updateData(this)" type="number" min="0" max="300" value="1" id="uelevel-${id}" /></td>
        `

        dentry.appendChild(row)
        charStats[id] = {
            stars: 0,
            rank: 0,
            uelevel: 0
        }
    })

function getImageURL(id, stars) {
    return `./unit/${id}${Math.min(hashlist[id].maxstar, [6, 1, 1, 3, 3, 3, 6][stars] || 6)}1.webp`
}

function onImgLoad(e) {
    e.isLoaded = true

    if (e.callback) {
        e.callback()
        e.callback = null
    }
}

function updateData(e) {
    const { id, value } = e
    const [type, cid] = id.split("-")
    charStats[cid][type] = +value

    const img = document.getElementById(`img-${cid}`)
    img.isLoaded = false
    img.src = getImageURL(cid, charStats[cid].stars)
    img.style = charStats[cid].stars == 0 ? "filter: grayscale(90%)" : ""

    updateOutput()
}

function updateTable() {
    Object.entries(charStats)
        .forEach(([id, data]) => {
            document.getElementById(`rank-${id}`).value = data.rank
            document.getElementById(`stars-${id}`).value = data.stars
            document.getElementById(`uelevel-${id}`).value = data.uelevel

            const img = document.getElementById(`img-${id}`)
            img.isLoaded = false
            img.src = getImageURL(id, charStats[id].stars)
            img.style = charStats[id].stars == 0 ? "filter: grayscale(100%)" : ""
        })
}

updateTable()