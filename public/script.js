
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
  showError('Wrong username or password.')
}

function showError(msg) {
  alert(msg)
}

load()