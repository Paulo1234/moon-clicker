const moon = document.querySelector('button#moon')
const clicksPerSecondText = document.querySelector('span#clicks')
const shopItems = document.querySelectorAll('div.item button')
const shopPrices = document.querySelectorAll('div.item span#price')
const popUp = document.querySelector("div#info")

let powerUpList = [
    {
        key: 'auto_click',
        name: 'Auto Click',
        description: 'Auto click moon 1 time per second'
    }, {
        key: 'astroneer',
        name: 'Astroneer',
        description: 'The astroneer will explore the moon adding 2 CPS'
    }, {
        key: 'cientist',
        name: 'Cientist',
        description: 'A smart cientist that improves moon exploration, adding 5 CPS'
    }
]

const powerUps = {
    auto_click: [0, 1, 10],
    astroneer: [0, 2, 100],
    cientist: [0, 5, 500]
}
let score = 0;
let clicksPerSecond = 0
let priceIncrementExpoent = 1

moon.addEventListener('click', () => {
    score += 1
    moon.textContent = score
})

// auto click
for(let i =0; i < shopItems.length; i++) {
    shopItems[i].addEventListener('click', () => {
        score = buyItem(powerUpList[i].key, score)
        moon.textContent = score
    })
    shopItems[i].addEventListener('mouseover', () => {
        popUp.style.visibility = 'visible'
        popUp.children[0].textContent = powerUpList[i].name
        popUp.children[1].textContent = powerUpList[i].description
    })
    shopItems[i].addEventListener('mouseleave', () => {
        popUp.style.visibility = 'hidden'
    })
}

function buyItem(item, score)
{
    let powerUpPrice = powerUps[item][2]
    if(score >= powerUpPrice) {
        score -= powerUpPrice
        powerUps[item][0] += 1
        clicksPerSecond = getClicksPerSecond(powerUps)
        clicksPerSecondText.textContent = clicksPerSecond + ' CPS'
        updateShopPrices()
    }
    return score
}

function updateShopPrices() {
    
    let index = 0
    let price = parseInt(priceIncrementExpoent)
    for(powerUp of powerUpList) {
        powerUps[powerUp.key][2] += parseInt(price / 100 * powerUps[powerUp.key][2])
        shopPrices[index].textContent = powerUps[powerUp.key][2]
        index++;
    }
    priceIncrementExpoent += 0.2
    priceIncrementExpoent = parseFloat(priceIncrementExpoent.toFixed(1))
}


function game(){
    score += clicksPerSecond
    moon.textContent = score
    window.setTimeout(game, 1000)
}

function getClicksPerSecond(powerUps) {
    let clicks = 0

    for(powerUp of powerUpList) {
        clicks += powerUps[powerUp.key][0] * powerUps[powerUp.key][1]
    }

    return clicks
}

game()