import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroMessage } from './erro-message';

describe('ErroMessage', () => {
  let component: ErroMessage;
  let fixture: ComponentFixture<ErroMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErroMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ErroMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
