import axios from "axios"

export const queryPlaces = async (query: string) => {
    const regex = new RegExp(query, 'gi')
    const where = (JSON.stringify({
        "name": {
            "$regex": query,
            "$options": "i"
        }
    }));

    const { data } = await axios({
        method: "GET",
        url: "https://parseapi.back4app.com/classes/Vietnam_City",
        params: {
            limit: 5,
            where
        },
        headers: {
            'X-Parse-Application-Id': 'f5ThCdnjj5fxyWBsudFqMtDwIHZX48v19VaVwR1C', // This is your app's application id
            'X-Parse-REST-API-Key': 'sPybGjr9tXt6zlg8o4sHxmyO2J4OErRElMOwozeK', // This is your app's REST API key
        }
    })

    return data.results
}