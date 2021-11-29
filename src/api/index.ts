import axios from "../axios"
import { CLogin } from "@/types/request-type/login"

export default {
  login(form: CLogin) {
    return axios.post(`/redmond-core-auth/oauth/token`, form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}