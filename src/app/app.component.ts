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

  onDrop(event, elem) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer.getData('text');
    let match = null;
    elem.childNodes.forEach(element => {
      // Prevent to move same draggable element to drop box
      if (element.id.includes(dataTransfer.slice(0, dataTransfer.length - 1))) {
        match = true;
      }
    });
    if (match) {
      return;
    }
    if (!dataTransfer.includes(elem.id.slice(0, elem.id.length - 1))) {
      const clone = this.renderer.selectRootElement(`#${dataTransfer}`).cloneNode(true);
      this.renderer.setProperty(clone, 'id', `${dataTransfer}-${elem.id}`);
      this.renderer.listen(clone, 'dragstart', (ev => {
        ev.dataTransfer.setData('text', ev.target.id);
      }));
      this.renderer.appendChild(elem, clone);
    } else {
      this.renderer.appendChild(elem, this.renderer.selectRootElement(`#${dataTransfer}`));
    }
  }

  allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  trackById(index: number) {
    return index;
  }
}
