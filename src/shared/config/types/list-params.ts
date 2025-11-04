export interface ListParams {
  page?: number
  per_page?: string | null
  search?: string
  orderby?: string
  sort?: 'asc' | 'desc'
  region_id?: string | null
  city_id?: string | null
  address_id?: string | null
  product_id?: string | null
  category_id?: string | null
  order_id?: string | number | readonly string[] | undefined
  status?: 'new' | 'confirmed' | 'completed' | 'canceled' | string | undefined
}
