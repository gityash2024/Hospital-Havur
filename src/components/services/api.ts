import axios from "axios"
import { constant } from "../../constant"
import { toast } from "react-toastify";


export const postApi = async (path: string, data: any) => {
    try {
        let result: any = await axios.post(constant.baseUrl + path, data, {
            headers: {
                'x-auth-token': localStorage.getItem("token") || sessionStorage.getItem("token"),
            }
        })

        return result;
    } catch (e: any) {
        toast.error(e);
        return e
    }
}