import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {super(popup),
    this._viewImage = this._popup.querySelector('.popup__view-image');
    this._viewLocation = this._popup.querySelector('.popup__view-location');
  }

  openPopup(place, link) {
    this._viewImage.src = link;
    this._viewImage.alt = place;
    this._viewLocation.textContent = place;
    super.openPopup ();
  }
}