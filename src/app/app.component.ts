import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  elements: Array<number>;

  ngOnInit() {
    this.elements = new Array(40);
  }

  onDrag(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.dataTransfer.effectAllowed = 'copy';
  }

  onDrop(event, el) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer.getData('text');
    const clone = this.renderer.selectRootElement(`#${dataTransfer}`).cloneNode(true);
    this.renderer.setProperty(clone, 'id', `picked-${dataTransfer}`);
    this.renderer.listen(clone, 'dragstart', (ev => {
      ev.dataTransfer.setData('text', ev.target.id);
    }));
    this.renderer.appendChild(el, clone);
    // this.renderer.appendChild(el, this.renderer.selectRootElement(`#${dataTransfer}`));
  }

  allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  trackById(index: number) {
    return index;
  }
}
