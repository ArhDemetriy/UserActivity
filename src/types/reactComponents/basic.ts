import { TUser } from "../../redux/store/reducer/userReducer";

export interface IBasicProps {
    requireCssClass: string
}

export type TBdUsers = (
    & Omit<TUser, 'lastActivity' | 'registration' | 'isValid'>
    // вызовет ошибку при изменении родительского типа. и пробросит TSDoc
    & { [k in keyof Pick<TUser, 'lastActivity' | 'registration'>]: number }
)[]
