import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuriPage } from './juri.page';

describe('JuriPage', () => {
  let component: JuriPage;
  let fixture: ComponentFixture<JuriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuriPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
