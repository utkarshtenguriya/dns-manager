import axios from "axios"

export const useFetchRecords = async () => {
    const response = await axios.post("/record/fetch")

    if (!response) {
        throw new Error("could not fetch data...")
    }

    return response.data
}