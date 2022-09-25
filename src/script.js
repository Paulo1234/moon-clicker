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
        key: 'powerful_click',
        name: 'Powerful click',
        description: 'Improve your mouse click power'
    }, {
        key: 'astroneer',
        name: 'Astroneer',
        description: 'The astroneer will explore the moon adding 5 CPS'
    }, {
        key: 'cientist',
        name: 'Cientist',
        description: 'A smart cientist that improves moon exploration, adding 20 CPS'
    }
]

const powerUps = {
    auto_click: [0, 1, 10],
    astroneer: [0, 5, 100],
    cientist: [0, 20, 500],
    powerful_click: [0, 0, 50],
}
let score = 0;
let clicksPerSecond = 0
let priceIncrementExpoent = 1

moon.addEventListener('click', () => {
    score += powerUps.powerful_click[0] + 1
    moon.textContent = minimizeNumber(score)
})

// auto click
for(let i =0; i < shopItems.length; i++) {
    shopItems[i].addEventListener('click', () => {
        score = buyItem(powerUpList[i].key, score)
        moon.textContent = minimizeNumber(score)
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
        clicksPerSecondText.textContent = minimizeNumber(clicksPerSecond) + ' CPS'
        updateShopPrices()
    }
    return score
}

function updateShopPrices() {
    
    let index = 0
    let price = parseInt(priceIncrementExpoent)
    for(powerUp of powerUpList) {
        powerUps[powerUp.key][2] += parseInt(price / 100 * powerUps[powerUp.key][2])
        shopPrices[index].textContent = minimizeNumber(powerUps[powerUp.key][2])
        index++;
    }
    priceIncrementExpoent += 0.1
    priceIncrementExpoent = parseFloat(priceIncrementExpoent.toFixed(1))
}


function game(){
    score += clicksPerSecond
    moon.textContent = minimizeNumber(score)
    window.setTimeout(game, 1000)
}

function getClicksPerSecond(powerUps) {
    let clicks = 0

    for(powerUp of powerUpList) {
        clicks += powerUps[powerUp.key][0] * powerUps[powerUp.key][1]
    }

    return clicks
}

function minimizeNumber(num){
    if(num >= 1000 && num < 1_000_000)
    {
        return (num / 1000).toFixed(1)+'K'
    } 
    else if(num >= 1_000_000 && num < 1_000_000_000)
    {
        return num / 1_000_000 + 'M'
    }
    else if(num >= 1_000_000_000 && num < 1_000_000_000_000)
    {
        return num / 1_000_000_000 + 'B'
    } else {
        return num
    }
}

game()