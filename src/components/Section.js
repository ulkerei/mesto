export default class Section {
  constructor ({renderer}, targetSelector) {
    this._renderer = renderer;
    this._target = document.querySelector(targetSelector);
  }

  renderItems (items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  placeItem (element, isInintial) {
    if (isInintial) {
      this._target.append(element);
    } else {
      this._target.prepend(element);
    }
  }
}