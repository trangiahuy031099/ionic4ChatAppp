import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuddiesPage } from './buddies.page';

describe('BuddiesPage', () => {
  let component: BuddiesPage;
  let fixture: ComponentFixture<BuddiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuddiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
