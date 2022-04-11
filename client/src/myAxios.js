import axios from "axios";

// const port = process.env.REACT_APP_PORT || 5000;
const myBaseURL = `http://localhost:5000`;
console.log(myBaseURL);
// axios
export const myAxios = axios.create({
	// baseURL: myBaseURL,
});

myAxios.interceptors.request.use((req) => {
	req.headers.test119 = "crb119";
	return req;
});
