import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreViewPage } from './more-view.page';

describe('MoreViewPage', () => {
  let component: MoreViewPage;
  let fixture: ComponentFixture<MoreViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
