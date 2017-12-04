class AuthBusiness {
  constructor(foxbitApi) {
    this.api = foxbitApi;
  }

  login(username, password, secondFactor, callBack) {
    const userData = { username, password, secondFactor };
    this.api.login(userData).then(x => {
      if (x.UserStatus !== 1) return { status: 'fail' };

      callBack({
        status: 'success',
        username: x.Username,
      });
    }).catch(() => {
      callBack({
        status: 'fail',
      });
    });
  }
}

export default AuthBusiness;
