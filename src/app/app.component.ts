import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  elements: Array<any>;

  ngOnInit() {
    this.elements = new Array(40);
  }

  drag(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.dropEffect = 'link';
  }

  onDrop(event, el) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer.getData('text');
    el.appendChild(document.getElementById(dataTransfer));
  }

  allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'link';
  }

  trackById(index: number) {
    return index;
  }
}
