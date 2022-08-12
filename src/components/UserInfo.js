export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._job = document.querySelector(data.job);
  }

  getUserInfo () {
    this._info = {
      name: this._name.textContent,
      job: this._job.textContent
    }

    return this._info;
  }

  setUserInfo (newInfo) {
    this._name.textContent = newInfo.name;
    this._job.textContent = newInfo.job;
  }
}