const apiUrl = 'https://mhw-db.com/monsters'

const monsterInput = document.querySelector('.monster-input')
const monsterBt = document.querySelector('.monster-button')
const clear = document.querySelector('.clear')
const form = document.querySelector('.search-container')
const content = document.querySelector('.api-content')

const findMonster = async monsters => {
  for (m of monsters) {
    if (m.name.match(monsterInput.value)) {
      const data = await fetch(apiUrl + '/' + m.id)
      return await data.json()
    }
  }
  alert('Monstro Não Encontrado')
}

function monsterTemplate(monster) {
  const monsterContainer = document.createElement('div')
  monsterContainer.classList.add('monster')
  content.appendChild(monsterContainer)

  const title = document.createElement('h1')
  title.innerHTML = monster.name

  const description = document.createElement('p')
  description.innerHTML =
    '<span class="title">Description: </span>' + monster.description

  const type = document.createElement('p')
  type.innerHTML = '<span class="title">Type: </span>' + monster.type

  const species = document.createElement('p')
  species.innerHTML = '<span class="title">Species: </span>' + monster.species

  monsterContainer.appendChild(title)
  monsterContainer.appendChild(description)
  monsterContainer.appendChild(type)
  monsterContainer.appendChild(species)

  if (monster.locations.length) {
    const locations = document.createElement('ul')
    monsterContainer.appendChild(locations)
    const locationsLabel = document.createElement('li')
    locationsLabel.innerHTML = '<span class="ul-title">Locations: </span>'
    locations.appendChild(locationsLabel)

    for (l of monster.locations) {
      const location = document.createElement('li')
      location.innerHTML = '<span class="ul-subtitle">Name: </span>' + l.name
      locations.appendChild(location)
    }
  }
  if (monster.resistances.length) {
    const resistances = document.createElement('ul')
    monsterContainer.appendChild(resistances)
    const resistancesLabel = document.createElement('li')
    resistancesLabel.innerHTML = '<span class="ul-title">Resistances: </span>'
    resistances.appendChild(resistancesLabel)

    for (r of monster.resistances) {
      const resistance = document.createElement('li')
      resistance.innerHTML =
        '<span class="ul-subtitle">Element: </span>' + r.element
      resistances.appendChild(resistance)
    }
  }
  if (monster.weaknesses.length) {
    const weaknesses = document.createElement('ul')
    monsterContainer.appendChild(weaknesses)
    const weaknessLabel = document.createElement('li')
    weaknessLabel.innerHTML = '<span class="ul-title">Weaknesses: </span>'
    weaknesses.appendChild(weaknessLabel)

    for (w of monster.weaknesses) {
      const weakness = document.createElement('li')
      weakness.innerHTML =
        '<span class="ul-subtitle">Element: </span>' + w.element
      weaknesses.appendChild(weakness)
    }
  }
}

function validation(field) {
  const regex = /[A-Za-z]{3,}/g
  if (regex.test(field)) {
    return true
  } else {
    alert('Campo Inválido')
    return false
  }
}

monsterBt.addEventListener('click', async e => {
  e.preventDefault()

  if (validation(monsterInput.value)) {
    const data = await fetch(apiUrl)
    const monsters = await data.json()

    const monster = await findMonster(monsters)

    monsterInput.value = ''
    monsterInput.focus()
    monsterTemplate(monster)
  } else {
    return
  }
})

clear.addEventListener('click', e => {
  e.preventDefault()
  const monsters = document.querySelectorAll('.monster')
  monsters.forEach(m => {
    m.remove()
  })
  monsterInput.focus()
})
