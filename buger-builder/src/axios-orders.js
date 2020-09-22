import axios from "axios";

const instance = axios.create({
    baseURL: "https://reactmyburger-b3347.firebaseio.com/"
});

export default instance;