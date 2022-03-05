import axios from "axios";

const SIGN_REST_API_URL = 'http://localhost:8080/api/auth/signup';

class SignUpUserService{

    signUser(user){
              return axios.post(SIGN_REST_API_URL,user);
    }
    
}

export default new SignUpUserService();