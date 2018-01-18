import Mustache from 'mustache';
import { Tracking } from "../utils/tracking";
import { viewProject } from "../actions";

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
    let projectBtns = document.querySelectorAll(".contentWrapper .button");
    projectBtns = Array.prototype.slice.call(projectBtns, 0);
    if (projectBtns && projectBtns.length > 0) {
      projectBtns.forEach( it => {
        it.addEventListener("click", this.onViewProject.bind(this), false);
      })
    }


  }

  onViewProject(e) {
    e.preventDefault();
    const target = e.currentTarget.classList[1] || "";
    viewProject(target)
  }
}

export default Component;
