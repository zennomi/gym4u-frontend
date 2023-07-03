import { User } from "../types";
import axios from "../utils/axios";

export const updateProfile = async (id: string, body: User) => {
    let fd = new FormData()
    fd.append('avatar', body.avatar)
    fd.append('email', body.email)
    fd.append('phone', body.phone)
    fd.append('sex', body.sex)
    fd.append('name', body.name)

    const { data } = await axios({
        method: 'PATCH',
        url: `/users/${id}`,
        data: fd,
    })
    return data
}