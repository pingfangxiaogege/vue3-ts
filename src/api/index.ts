import axios from "../axios"
import { CLogin } from "@/types/request-type/login"

export default {
  login(formField: CLogin) {
    const formData = new FormData()
    formData.append('username', formField.username)
    formData.append('password', formField.password)
    formData.append('grant_type', formField.grant_type)
    formData.append('scope', formField.scope)
    formData.append('client_id', formField.client_id)
    formData.append('client_secret', formField.client_secret)
    return axios.post(`/redmond-core-auth/oauth/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}