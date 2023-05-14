import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAddComponent } from './curso-add.component';

describe('CursoAddComponent', () => {
  let component: CursoAddComponent;
  let fixture: ComponentFixture<CursoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
