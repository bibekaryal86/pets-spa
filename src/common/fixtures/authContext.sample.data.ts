import { DefaultUserDetails } from '../../home/types/home.data.types';


export const getAuthSample = () => {
  return {
    auth: {
      isLoggedIn: true,
      token: 'the-token',
      userDetails: {
        ...DefaultUserDetails,
        username: 'example86',
      },
    },
    login: jest.fn(),
  };
};
