import axios from "axios";
let count = 0;

// const port = process.env.REACT_APP_PORT || 5000;
const myBaseURL = `http://localhost:5000`;
console.log(myBaseURL);
// axios
export const myAxios = axios.create({
	// baseURL: myBaseURL,
});

myAxios.interceptors.request.use((req) => {
	req.headers.test119 = `crb119-${count}`;
	count++;
	return req;
});

// exported and used in context file
// myAxios.interceptors.response.use(
// 	(res) => res,
// 	(error) => {if(error.response.status === 401) //must logout}
// );
