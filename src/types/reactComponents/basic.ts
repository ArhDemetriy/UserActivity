import { ArrayOfUser } from "../../redux/store/reducer/userReducer";

export interface IBasicProps {
    requireCssClass: string
}

export type TBdUsers = (
    & Omit<ArrayOfUser[0], 'lastActivity' | 'registration'>
    // вызовет ошибку при изменении родительского типа. и пробросит TSDoc
    & { [k in keyof Pick<ArrayOfUser[0], 'lastActivity' | 'registration'>]: number }
)[]
