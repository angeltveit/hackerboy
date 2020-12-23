
var audio = new Audio('/access_denied.mp3');


async function load() {
  const response = await fetch('/data')
  const { real, dummy } = await response.json()
  window.encodedString = real
  window.dummyEncodedString = dummy
}

async function login() {
  const username = document.querySelector('.username').value
  const password = document.querySelector('.password').value
  
  const inputEncoded = btoa(`${username}:${password}`)
  
  console.log('Generated login string:', inputEncoded)

  if(inputEncoded === window.encodedString || inputEncoded === window.dummyEncodedString) {
    const response = await fetch('/auth?token='+inputEncoded)
    const { redirect, error } = await response.json()
    if(error) {
      return showError(error)
    }
    return window.location = redirect
  }
  accessDenied(true)
  setTimeout(() => {
    accessDenied(false)
  },6000)
}

function accessDenied(show=true) {
  document.querySelector('.error').style.display = show ? 'block' : 'none'
  document.querySelector('.login-btn').style.display = show ? 'none' : 'block'
  if(show) Array.from(document.querySelectorAll('input')).forEach(el => el.value = '')
  if(show) audio.play()
}

function showError(msg) {
  alert(msg)
}

load()