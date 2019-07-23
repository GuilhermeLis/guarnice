import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostraCompPage } from './mostra-comp.page';

describe('MostraCompPage', () => {
  let component: MostraCompPage;
  let fixture: ComponentFixture<MostraCompPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostraCompPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostraCompPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
