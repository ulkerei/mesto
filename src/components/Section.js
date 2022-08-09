export default class Section {
  constructor ({items,renderer}, targetSelector) {
    this._items = items;
    this._renderer = renderer;
    this._targetSelector = targetSelector;
  }

  renderItems () {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  placeItem (element, isInintial) {
    if (isInintial) {
      this._targetSelector.append(element);
    } else {
      this._targetSelector.prepend(element);
    }
  }
}