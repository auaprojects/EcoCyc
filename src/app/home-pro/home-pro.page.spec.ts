import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeProPage } from './home-pro.page';

describe('HomeProPage', () => {
  let component: HomeProPage;
  let fixture: ComponentFixture<HomeProPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
