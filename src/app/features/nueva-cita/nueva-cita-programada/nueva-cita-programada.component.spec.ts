import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCitaProgramadaComponent } from './nueva-cita-programada.component';

describe('NuevaCitaProgramadaComponent', () => {
  let component: NuevaCitaProgramadaComponent;
  let fixture: ComponentFixture<NuevaCitaProgramadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCitaProgramadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaCitaProgramadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
