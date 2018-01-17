import Mustache from 'mustache';

class Thumbnail {
  constructor(data) {
    this.data = data;
    this.render();
  }
  render() {
    let template = require(`../../templates/thumbnail.tmpl.html`);
    this.el = Mustache.render(template, this.data);
  }

}

export default Thumbnail;
