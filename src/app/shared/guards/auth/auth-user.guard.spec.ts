import { TestBed } from '@angular/core/testing';

import { AuthUserGuard } from './auth-user.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthUserGuard', () => {
  let guard: AuthUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(AuthUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  
});
