import { ProductListConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'
import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  //tạo biến để filter QueryParams
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      // limit: queryParams.limit || 15,
      limit: 12,
      exclude: queryParams.exclude,
      name: queryParams.name,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
