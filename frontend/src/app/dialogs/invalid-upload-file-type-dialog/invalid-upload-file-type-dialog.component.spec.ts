import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidUploadFileTypeDialogComponent } from './invalid-upload-file-type-dialog.component';

describe('InvalidUploadFileTypeDialogComponent', () => {
  let component: InvalidUploadFileTypeDialogComponent;
  let fixture: ComponentFixture<InvalidUploadFileTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidUploadFileTypeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidUploadFileTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
