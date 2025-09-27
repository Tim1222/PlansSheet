export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<T = {}> = {
    data: T //{} or {item: Todolist}
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}