import { Component, OnInit } from '@angular/core';
import { sp } from "@pnp/sp";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sp.web.select("Title").get().then(w => {
      console.log(`Web Title: ${w.Title}`);
    });
  }
}
