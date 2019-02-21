import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'md-app-bar',
  styleUrls: [
    './md-app-bar.component.scss'
  ],
  templateUrl: './md-app-bar.component.pug'
})
export class MdAppBarComponent implements OnInit {

  title: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.title = 'Chimerical Conversions';//this.activatedRoute.snapshot.data[0]['title'];
  }

}
