export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._job = document.querySelector(data.job);
    this._avatar = document.querySelector(data.avatar);
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
    this._job.textContent = newInfo.job || newInfo.about;
    this._id = newInfo._id;
  }

  setAvatar (data) {
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }
}