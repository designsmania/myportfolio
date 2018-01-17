import Mustache from 'mustache';

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

  }
}

export default Header;
