import { searchProducts } from '../../api/products.js'

// Inside the useEffect — replace getProducts({ search: query }) with:
const data = await searchProducts(query)
setResults(data.slice(0, 6))