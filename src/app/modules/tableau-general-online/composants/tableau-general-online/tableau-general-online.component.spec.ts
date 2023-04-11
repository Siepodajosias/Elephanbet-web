import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauGeneralOnlineComponent } from 'src/app/modules/tableau-general-online/composants/tableau-general-online/tableau-general-online.component';

describe('TableauGeneralOnlineComponent', () => {
  let component: TableauGeneralOnlineComponent;
  let fixture: ComponentFixture<TableauGeneralOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauGeneralOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauGeneralOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
