export type signUpForm = {
  email: string;
  password: string;
  passwordCheck: string;
};

export type logInForm = Omit<signUpForm, 'passwordCheck'>;
