import { TestBed } from '@angular/core/testing';

import { ActionsInfoResolver } from './actions-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionsInfoResolver', () => {
  let resolver: ActionsInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    resolver = TestBed.inject(ActionsInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
