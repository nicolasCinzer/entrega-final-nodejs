import { showToast } from './showToast.js'
window.__productsFn = { addToCart }

const url = 'http://localhost:8080'
const cartElements = {
  amountProducts: document.getElementById('amountProductsInCart')
}

async function addToCart(evt, cid, pid) {
  let res
  try {
    res = await (await fetch(`${url}/api/carts/${cid}/product/${pid}`, { method: 'POST' })).json()
  } catch (error) {
    throw new Error(`FAILED:: Fetch on function -> addToCart \n ${error}`)
  }

  const { payload, product } = res

  const { amountProducts } = cartElements

  amountProducts.innerHTML = payload.products.length

  showToast({ text: `${product} added to cart!` })
}
