const inputs = document.getElementsByTagName('input')
const submitBtn = document.querySelector('button[type=submit]')

submitBtn.onmouseover = () => {
  const inputsList = [...inputs]

  const emptyFields = inputsList.filter(input => !input.value)

  if (!emptyFields.length) return submitBtn.removeAttribute('disabled')

  submitBtn.setAttribute('disabled', true)
}

submitBtn.onmouseleave = () => {
  submitBtn.removeAttribute('disabled')
}
