import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinadosPage } from './assinados.page';

describe('AssinadosPage', () => {
  let component: AssinadosPage;
  let fixture: ComponentFixture<AssinadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssinadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
