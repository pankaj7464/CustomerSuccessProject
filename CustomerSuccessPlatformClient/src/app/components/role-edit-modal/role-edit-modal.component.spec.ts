import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEditModalComponent } from './role-edit-modal.component';

describe('RoleEditModalComponent', () => {
  let component: RoleEditModalComponent;
  let fixture: ComponentFixture<RoleEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
