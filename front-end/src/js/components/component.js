import Mustache from 'mustache';
import { Tracking } from "../utils/tracking";

class Component {
  constructor(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.data.cdn = CDN;
    console.log(this.data)
    let template = require(`../../templates/${this.data.template}`);
    this.el = Mustache.render(template, this.data);
  }

  mounted() {

  }
}

export default Component;
