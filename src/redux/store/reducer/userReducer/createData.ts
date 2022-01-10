import { TData, TDataStatus } from "./userReducer";

/** возвращает новый объект созданный по шаблону необходимому для TUsers в редаксе */
export function createData<T>(data: T, status: TDataStatus): TData<T> {
    return {
        data,
        status,
    }
}
