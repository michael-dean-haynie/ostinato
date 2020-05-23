import { TestBed } from '@angular/core/testing';

import { VisualNotificationService } from './visual-notification.service';

describe('VisualNotificationService', () => {
  let service: VisualNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
