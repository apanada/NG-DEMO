import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.render();
  }

  private async render(): Promise<void> {
    const clients = await this.dataService.getClients("Clients");
    console.log(clients);
  }
}
