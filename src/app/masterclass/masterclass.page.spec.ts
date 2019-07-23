import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterclassPage } from './masterclass.page';

describe('MasterclassPage', () => {
  let component: MasterclassPage;
  let fixture: ComponentFixture<MasterclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterclassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
