import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  drag(event, data) {
    console.log('data: ', data);
    console.log('event: ', event);
    event.dataTransfer.setData('text', event.target.id);
  }

  onDrop(event) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(dataTransfer));
  }

  allowDrop(event) {
    event.preventDefault();
  }
}
