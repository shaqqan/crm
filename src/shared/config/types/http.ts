interface Response {
  status: number
  message: string | null
}

type ValidationsError = Record<string, string[] | string>

export interface ResponseWithData<T> extends Response {
  data: T
}

export interface ResponseDataWithItems<T> {
  items: T[]
  updated_at: string
}

export interface ResponseWithMessage extends Response {
  message: string
}

export interface ResponseWithDataAndMessage<T> extends ResponseWithMessage {
  data: T
}

export interface ResponseWithPagination<T> extends Response {
  data: T
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: { active: boolean; label: string; url: null | string }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface HTTPError extends Response {
  message: string
  errors?: ValidationsError
}
