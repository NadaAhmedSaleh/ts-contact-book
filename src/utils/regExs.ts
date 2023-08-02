const regExs = {
  password: /^(?=.*[a-zA-Z])(?=.*\d).{8,12}$/, // at least 1 alphabet and 1 number, length [8,12]
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, // username@example.com
};

export default regExs;
