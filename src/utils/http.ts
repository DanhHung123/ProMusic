import axios from "axios";

const http = axios.create({
	baseURL: "https://api-kaito-music.vercel.app/api",
	timeout: 10000,
});

export default http;
