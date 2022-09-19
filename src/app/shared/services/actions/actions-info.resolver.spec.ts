import { TestBed } from '@angular/core/testing';

import { ActionsInfoResolver } from './actions-info.resolver';

describe('ActionsInfoResolver', () => {
  let resolver: ActionsInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ActionsInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
