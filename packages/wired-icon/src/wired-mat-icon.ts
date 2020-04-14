import { customElement, property } from 'lit-element';
import { WiredIcon } from './wired-icon';
import { iconsetLoader } from './iconset';
import { ICON_SET } from './iconset/iconset-full';

const findSvgPath = iconsetLoader(ICON_SET);

@customElement('wired-mat-icon')
export class WiredMatIcon extends WiredIcon {
  private _icon: string = '';

  @property({ type: String })
  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
    this.path = findSvgPath(this.icon);
    this.aria = this.icon;
  }
}