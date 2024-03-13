import { getTicket } from '../DAL/dao/tickets.dao.js'
import { cartsService } from './carts.service.js'
import { productsService } from './products.service.js'

class ViewsService {
  buildHeaderRender = async ({ full_name, user_initials, cart }) => {
    const userCart = await cartsService.getCartById(cart)

    const headerRender = {
      user: full_name,
      user_initials,
      products_in_cart: userCart.products.length
    }

    return { userCart, headerRender }
  }

  buildProductsRender = async ({ queryOpt, full_name, user_initials, cart }) => {
    let { limit, page, sort, query } = queryOpt

    if (query?.title === '') {
      query = {}
    }

    const products = await productsService.getProducts({ limit, page, sort, query }, true)

    const { headerRender } = await this.buildHeaderRender({ full_name, user_initials, cart })

    const renderVariables = {
      products: products.docs
        .map(product => product.toJSON())
        .map(product => ({ ...product, _id: product._id.toString(), category: product.category.replaceAll('|', ' • ') })),
      page: products.page,
      products_amount: products.totalDocs,
      totalPages: products.totalPages,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      ...headerRender,
      cid: cart
    }

    let searchParams = new URLSearchParams(queryOpt)

    products.hasPrevPage ? (renderVariables['prevPage'] = `http://localhost:8080/home?page=${products.prevPage}&${searchParams}`) : null
    products.hasNextPage ? (renderVariables['nextPage'] = `http://localhost:8080/home?page=${products.nextPage}&${searchParams}`) : null

    return renderVariables
  }

  buildCartRender = async ({ full_name, user_initials, cart }) => {
    const { userCart, headerRender } = await this.buildHeaderRender({ full_name, user_initials, cart })

    const products = userCart.products
      .map(({ product, quantity }) => ({ ...product.toJSON(), quantity }))
      .map(product => ({
        ...product,
        _id: product._id.toString(),
        category: product.category.replaceAll('|', ' • '),
        price: product.price * product.quantity,
        unitPrice: product.price
      }))

    const totalPurchase = products.reduce((total, item) => {
      return (total += item.price)
    }, 0)

    return {
      products,
      ...headerRender,
      totalPurchase,
      cid: cart
    }
  }

  buildTicketRender = async ({ full_name, user_initials, cart, email }) => {
    const { headerRender } = await this.buildHeaderRender({ full_name, user_initials, cart })

    const tickets = await getTicket(email)

    const ticket = tickets[tickets.length - 1]._doc

    ticket.purchase_datetime = new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    })
      .format(ticket.purchase_datetime)
      .replace(',', '')

    return {
      ...headerRender,
      ...ticket
    }
  }
}

export const viewsService = new ViewsService()
