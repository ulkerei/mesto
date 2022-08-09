import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {super(popup)}

  openPopup(place, link) {
    const viewer = document.querySelector('.popup_type_viewer');
    const viewImage = viewer.querySelector('.popup__view-image');
    const viewLocation = viewer.querySelector('.popup__view-location');
    viewImage.src = link;
    viewImage.alt = place;
    viewLocation.textContent = place;
    super.openPopup ();
  }
}