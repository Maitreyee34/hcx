import axios from "axios";

const hcxAxiosInstance = axios.create({
    baseURL: "https://<server_address>/<protocol_version/><resource_name>/<action|on_action>",
})

