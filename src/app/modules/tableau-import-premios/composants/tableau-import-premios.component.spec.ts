import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauImportPremiosComponent } from 'src/app/modules/tableau-import-premios/composants/tableau-import-premios.component';

describe('TableauImportPremiosLojasComponent', () => {
  let component: TableauImportPremiosComponent;
  let fixture: ComponentFixture<TableauImportPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauImportPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauImportPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
