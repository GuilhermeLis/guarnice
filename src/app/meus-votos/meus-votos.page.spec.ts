import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusVotosPage } from './meus-votos.page';

describe('MeusVotosPage', () => {
  let component: MeusVotosPage;
  let fixture: ComponentFixture<MeusVotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusVotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusVotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
