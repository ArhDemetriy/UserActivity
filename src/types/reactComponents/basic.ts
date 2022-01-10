import { TUser } from "../../redux/store/reducer/userReducer/userReducer";

export interface IBasicProps {
    requireCssClass: string
}

export type TBdUsers = (
    // вызовет ошибку при изменении родительского типа. и пробросит TSDoc
    & { [k in keyof Pick<TUser, 'lastActivity' | 'registration' | 'id'>]: number }
)[]
