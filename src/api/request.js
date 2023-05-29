import axios from 'axios';
export const service=axios.create({
    baseURL: "http://118.202.10.7:13456", //"http://139.224.119.118:8085" "http://localhost:8085"
    timeout : 5000,
})
export default service