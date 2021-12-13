export interface LoginResponse {
  statusCode: number;
  token: string;
  userDetails: UserDetails;
}

export interface UserDetails {
  username: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  phone: string;
  status: string;
}

export interface UserLoginAction extends UserLoginState {
  type: string;
}

export interface UserLoginState {
  error: string;
  loginResponse: LoginResponse;
}

export const DefaultUserDetails = {
  username: '',
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  state: '',
  zipcode: '',
  email: '',
  phone: '',
  status: '',
};

export const DefaultLoginResponse = {
  statusCode: 0,
  token: '',
  userDetails: DefaultUserDetails,
};
