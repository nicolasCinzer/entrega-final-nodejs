import { getProducts, getPaginatedProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../DAL/dao/products.dao.js'
import { MockingProducts } from '../mocks/products.mock.js'
import { checkValidOID } from '../utils/index.js'

class ProductsService {
  async getProducts({ limit = 10, page = 1, sort = 'def', query = {} } = {}, paginated = false) {
    const { title } = query
    if (title) {
      query.title = { $regex: `.*${title}.*`, $options: 'i' }
    }

    if (!paginated) {
      try {
        return getProducts(query)
      } catch (err) {
        throw new Error(err)
      }
    }

    try {
      const sortOpt = {
        asc: { price: 1 },
        desc: { price: -1 },
        def: { createdAt: -1 }
      }

      const opt = { limit: parseInt(limit), page: parseInt(page), sort: sortOpt[sort] }

      return getPaginatedProducts({ opt, query })
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getProductById(id) {
    checkValidOID(id)

    try {
      return getProductById(id)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async addProduct(product) {
    try {
      return addProduct(product)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async updateProduct({ id, product }) {
    checkValidOID(id)

    try {
      return updateProduct({ id, product })
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async deleteProduct(id) {
    checkValidOID(id)

    try {
      return deleteProduct(id)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  mocking(amount) {
    return MockingProducts.randomProducts(amount)
  }
}

export const productsService = new ProductsService()
