export default class Section {
  constructor ({items,renderer}, targetSelector) {
    this._items = items;
    this._renderer = renderer;
    this._target = document.querySelector(targetSelector);
  }

  renderItems () {
    this._items.forEach((item) => {
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