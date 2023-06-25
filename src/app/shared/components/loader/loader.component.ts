import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoader = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.isLoaderEvent.subscribe((data: boolean) => {
      this.isLoader = data;
      console.log(this.isLoader);
    });
  }
}
