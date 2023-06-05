import originalAxios from "axios";
import { HOST_API } from "../config";

const axios = originalAxios.create({
    baseURL: `${HOST_API}/v1`
})

export default axios