import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  panelOpenState = false;

  yt_iframe_html: any;
  vimeo_iframe_html: any;
  dm_iframe_html: any;

  vimeoUrl = "https://vimeo.com/197933516";
  youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";
  dailymotionUrl = "https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport";

  constructor(private embedService: EmbedVideoService) { }

  ngOnInit() {
    this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
    this.vimeo_iframe_html = this.embedService.embed(this.vimeoUrl);
    this.dm_iframe_html = this.embedService.embed(this.dailymotionUrl);
  }
}
