import { Dispatch, ReactNode, SetStateAction } from 'react'
import { HTTPError, ResponseWithData } from './http'
import { SelectType } from './select-type'

export type RowData = Record<string, unknown>

export interface ColumnProps<T, K extends keyof T> {
  accesorkey: K
  header: string
  render?: ({
    column,
    item,
  }: {
    column?: ColumnProps<T, K>
    item?: string
    rowIndex?: number
    row: T
  }) => ReactNode
  filter?: {
    isExist: boolean
    data: ResponseWithData<SelectType[]> | undefined
    state: string | null
    setState: (id: string | null) => void
    loader?: boolean
  }
  search?: {
    isExist: boolean
    state: string | number | readonly string[] | undefined
    setState: (value: string | number | readonly string[] | undefined) => void
    type: string
  }
}

export interface MantineTableComponentProps<T, K extends keyof T> {
  // isError isFetching error pagination setPagination total data handleOpenModal
  // joqaridag'ilardi ? etip qoydim, bekend joq bolganligi ushin, keyin qosiw kerek
  isError?: boolean
  isFetching?: boolean
  error?: HTTPError | null
  enableSearch?: boolean
  globalFilter?: string
  setGlobalFilter?: Dispatch<SetStateAction<string>>
  pagination?: { pageIndex?: number; pageSize?: string | null }
  setPagination?: Dispatch<
    SetStateAction<{
      pageIndex?: number | undefined
      pageSize?: string | null | undefined
    }>
  >
  total?: number | undefined
  data?: Array<T> | undefined
  handleOpenModal?: (order: T) => void
  columns: Array<ColumnProps<T, K>>
  sorting?: { id: string; desc: boolean }[]
  setSorting?: Dispatch<SetStateAction<{ id: string; desc: boolean }[]>>
  orderBy?: string | undefined
  setModalOpened?: Dispatch<SetStateAction<boolean>>
}
