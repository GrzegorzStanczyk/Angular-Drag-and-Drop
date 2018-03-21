import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  elements: Array<number>;
  private draggedElement: ElementRef;

  ngOnInit() {
    this.elements = new Array(40);
  }

  onDrag(event, element): void {
    event.dataTransfer.setData('text', JSON.stringify({id: event.target.id, content: event.target.innerText}));
    event.dataTransfer.effectAllowed = 'copy';
    this.draggedElement = element;
  }

  onDrop(event, elem): void {
    event.preventDefault();
    const dataTransfer = JSON.parse(event.dataTransfer.getData('text'));
    let match = null;
    elem.childNodes.forEach(element => {
      if (element.id.includes(dataTransfer.id.slice(0, 7))) {
        match = true;
      }
    });
    if (match) {
      return;
    }
    if (!dataTransfer.id.includes(elem.id.slice(0, elem.id.length - 1))) {
      const clone = this.renderer.selectRootElement(`#${dataTransfer.id}`).cloneNode(true);
      this.renderer.setProperty(clone, 'id', `${dataTransfer.id}-${elem.id}`);
      this.renderer.listen(clone, 'dragstart', (ev => {
        ev.dataTransfer.setData('text', JSON.stringify({id: ev.target.id, content: ev.target.innerText}));
      }));
      this.renderer.appendChild(clone, this.renderer.createText(dataTransfer.content));
      this.renderer.appendChild(elem, clone);

      this.renderer.appendChild(this.draggedElement, this.renderer.createText(dataTransfer.content));
    } else {
      const movedElement = this.renderer.selectRootElement(`#${dataTransfer.id}`);
      this.renderer.appendChild(movedElement, this.renderer.createText(dataTransfer.content));
      this.renderer.appendChild(elem, movedElement);
    }
  }

  allowDrop(event): void {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  trackById(index: number): number {
    return index;
  }
}
