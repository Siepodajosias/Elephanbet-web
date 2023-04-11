import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPremiosLojasComponent } from 'src/app/modules/admin/components/import-premios-lojas/import-premios-lojas.component';

describe('ImportPremiosLojasComponent', () => {
  let component: ImportPremiosLojasComponent;
  let fixture: ComponentFixture<ImportPremiosLojasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPremiosLojasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPremiosLojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
