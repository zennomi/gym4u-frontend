import originalAxios from "axios";

const axios = originalAxios.create({
    baseURL: 'http://localhost:5000/v1'
})

export default axios