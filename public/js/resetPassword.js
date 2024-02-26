const resetPasswordBtn = document.getElementById('resetPasswordBtn')
const input = document.getElementById('email') ?? document.getElementById('password')

input.addEventListener('change', ({ target }) => {
  if (!target.value) return resetPasswordBtn.setAttribute('disabled', true)

  resetPasswordBtn.removeAttribute('disabled')
})
