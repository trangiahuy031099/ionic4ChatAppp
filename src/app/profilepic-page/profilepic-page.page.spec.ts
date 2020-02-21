import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilepicPagePage } from './profilepic-page.page';

describe('ProfilepicPagePage', () => {
  let component: ProfilepicPagePage;
  let fixture: ComponentFixture<ProfilepicPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepicPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilepicPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
