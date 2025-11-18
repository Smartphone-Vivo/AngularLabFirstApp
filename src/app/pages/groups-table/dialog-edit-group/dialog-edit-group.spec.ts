import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGroup } from './dialog-edit-group';

describe('DialogEditGroup', () => {
  let component: DialogEditGroup;
  let fixture: ComponentFixture<DialogEditGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
