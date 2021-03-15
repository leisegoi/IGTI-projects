let users = null
let menCount = 0
let womenCount = 0
let ageSum = 0
let ageMean = 0
let searchButton = document.getElementById('searchButton')
let searchInput = document.getElementById('searchInput')

async function fetchUsers() {
  let response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  let parsedResponse = await response.json()

  let parsedUsers = parsedResponse.results.map(result => {
    return {
      name: `${result.name.first} ${result.name.last}`,
      picture: result.picture.thumbnail,
      age: result.dob.age,
      gender: result.gender
    }
  })

  return parsedUsers.sort((a,b) => a.name.localeCompare(b.name))
}

function render(searchedUsers) {
  renderUsers(searchedUsers)
  renderStatistics(searchedUsers)
}

function renderUsers(searchedUsers) {
  document.getElementById('usersHeader').innerHTML = `${searchedUsers.length} usuário(s) encontrado(s)`
  document.getElementById('usersList').innerHTML = ''
  searchedUsers.forEach(renderUser)
}

function renderUser(user) {
  document.getElementById('usersList').innerHTML += `
  <tr>
    <td><img src='${user.picture}' class='roundImg'></td>
    <td>${user.name}</td>
    <td>${user.age} anos</td>
  </tr>`
}

function renderStatistics(searchedUsers) {
  document.getElementById('statisticsHeader').innerHTML = `Estatísticas`
  document.getElementById('statisticsList').innerHTML = `
  <tr>
    <td>Sexo Masculino</td>
    <td>${getMaleCount(searchedUsers)}</td>
  </tr>
  <tr>
    <td>Sexo Feminino</td>
    <td>${getFemaleCount(searchedUsers)}
  </tr>
  <tr>
    <td>Soma das Idades</td>
    <td>${getAgesSum(searchedUsers)}</td>
  </tr>
  <tr>
    <td>Média das Idades</td>
    <td>${getAgesMean(searchedUsers)}</td>
  </tr>`
}

function getMaleCount(searchedUsers) {
  return searchedUsers.filter(user => user.gender == 'male').length
}

function getFemaleCount(searchedUsers) {
  return searchedUsers.filter(user => user.gender == 'female').length
}

function getAgesSum(searchedUsers) {
  return searchedUsers.reduce((sum, user) => sum + user.age, 0)
}

function getAgesMean(searchedUsers) {
  return Math.round(getAgesSum(searchedUsers)/searchedUsers.length)
}

function search(term) {
  return users.filter(user => user.name.toLowerCase().includes(searchInput.value.toLowerCase()))
}

function presentLoading() {
  document.getElementById('loading').classList.remove('hide')
}

function hideLoading() {
  document.getElementById('loading').classList.add('hide')
}

function performSearch() {
  if(searchShouldBeActive()) {
    presentLoading()
    setTimeout(() => {
      render(search())
      hideLoading()
    } , 500)
  }
}

function activateSearchButton() {
  searchButton.classList.remove('disabled')
}

function deactivateSearchButton() {
  searchButton.classList.add('disabled')
}

function searchShouldBeActive() {
  return searchInput.value.length > 0
}

function toggleSearchButton(event) {
  if(searchShouldBeActive()) {
    activateSearchButton()
  } else {
    deactivateSearchButton()
  }
}

function isEnterPressed(event) {
  if(event.key == 'Enter') {
    performSearch()
  }
}

function handleButtonActivation() {
  searchInput.addEventListener('keyup', toggleSearchButton)
}

function handleSearchOnButtonClick() {
  searchButton.addEventListener('click', performSearch)
}

function handleSearchOnEnter() {
  searchInput.addEventListener('keyup', isEnterPressed)
}

function handleSearch() {
  handleButtonActivation()
  handleSearchOnButtonClick()
  handleSearchOnEnter()
}

async function userSearchPage() {
  users = await fetchUsers()

  handleSearch()
}


userSearchPage()









// console.log('Inicializando API dos Usuários')
// apiUsuarios
//   .then(function (response) {
//     return response.json()
//   })
//   .then(function (responseJSON) {
//     console.log(responseJSON)
//   })
//   .catch(function (error) {
//     console.log('FUDEU: ' , error)
//   })


// apiUsuarios
//   .then(response => response.json())
//   .then(responseJSON => console.log(responseJSON))


// // Jeito um
// // Async-Await


// async function bla() {
//   let response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
//   let parsedResponse = await response.json()

//   console.log(parsedResponse)
// }
