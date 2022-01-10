export type TUsers = TUser[]
export type TUser = {
    id: TData<number>
    registration: TData<Date>
    lastActivity: TData<Date>
}

export type TData<T> = {
    status: TDataStatus
    data: T
}
export type TDataStatus = 'valid' | 'invalid' | 'needValidate' | 'validating' | 'loading'
