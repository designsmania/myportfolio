import Mustache from 'mustache';
import { updateSection } from "../actions";

class Header  {
  constructor(data) {
     this.data = {}
     this.data.sections = data;
     this.render();
  }

  render() {
    this.data.cdn = CDN;
    let template = require(`../../templates/header.tmpl.html`);
    this.el = Mustache.render(template, this.data);

  }

  mounted() {
    this.navs = document.querySelectorAll("nav ul li");
    this.navs = Array.prototype.slice.call(this.navs, 0);
    this.navs.forEach(it => {
      it.addEventListener("click", this.onUpdate.bind(this), false);
    });

  }

  onUpdate(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const payload = this.data.sections.filter( it => it.id === target.id)[0];
    updateSection(payload)
  }    
}




export default Header;
