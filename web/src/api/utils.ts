import { API_URL } from "@/utils/constants";
import { Api } from "./Api";

const api = new Api();
api.baseUrl = API_URL;

export { api };
