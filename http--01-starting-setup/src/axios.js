import axios from "axios";

const instance = axios.create(
    {
        baseURL: "https://jsonplaceholder.typicode.com"
    }
)

// Perfect entry point to set all custom params on this instance of Axios (interceptors included)
// instance...

export default instance;