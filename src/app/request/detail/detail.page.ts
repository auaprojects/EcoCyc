import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    // this.id = +this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }

}
