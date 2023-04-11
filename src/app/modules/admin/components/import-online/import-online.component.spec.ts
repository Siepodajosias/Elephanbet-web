import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOnlineComponent } from './import-online.component';

describe('ImportOnlineComponent', () => {
  let component: ImportOnlineComponent;
  let fixture: ComponentFixture<ImportOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
