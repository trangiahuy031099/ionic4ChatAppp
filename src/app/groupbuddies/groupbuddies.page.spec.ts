import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupbuddiesPage } from './groupbuddies.page';

describe('GroupbuddiesPage', () => {
  let component: GroupbuddiesPage;
  let fixture: ComponentFixture<GroupbuddiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupbuddiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupbuddiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
