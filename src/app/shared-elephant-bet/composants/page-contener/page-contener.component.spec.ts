import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContenerComponent } from 'src/app/shared-elephant-bet/composants/page-contener/page-contener.component';

describe('PageContenerComponent', () => {
  let component: PageContenerComponent;
  let fixture: ComponentFixture<PageContenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageContenerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageContenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
