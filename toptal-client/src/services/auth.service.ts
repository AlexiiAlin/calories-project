import {http} from "../helpers/http-request";

export class AuthService {
  public static async login(email: string, password: string): Promise<any> {
    return http.post('login', {
      email,
      password
    });
  }

  public static async logout(): Promise<any> {
    return http.post('logout');
  }

  public static async me(): Promise<any> {
    return http.post('me');
  }
}
