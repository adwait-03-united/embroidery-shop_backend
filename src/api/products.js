import axiosInstance from './axiosInstance.js'

export const getProducts = async (filters = {}) => {
  const params = {}
  if (filters.category) params.category = filters.category
  if (filters.search)   params.search   = filters.search
  if (filters.sort)     params.sort     = filters.sort
  if (filters.page)     params.page     = filters.page
  if (filters.limit)    params.limit    = filters.limit

  const { data } = await axiosInstance.get('/products', { params })
  return data.products ?? data
}

export const getProductBySlug = async (slug) => {
  const { data } = await axiosInstance.get(`/products/${slug}`)
  return data
}

export const getFeaturedProducts = async () => {
  const { data } = await axiosInstance.get('/products/featured')
  return data
}

export const searchProducts = async (query) => {
  const { data } = await axiosInstance.get('/products/search', {
    params: { q: query },
  })
  return data
}