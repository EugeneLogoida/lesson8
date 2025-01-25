import { TestBed } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ActionsService', () => {
  let service: ActionsService;
  let httpTestingController: HttpTestingController;
  let api = 'http://localhost:3000'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ActionsService);
    httpTestingController = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('can test HttpClient.get', () => {

  //   const data = [{
  //     id: 1,
  //     name: 'string',
  //     title: 'string',
  //     description: 'string',
  //     imagePath: 'string'
  //   }]
  //   service
  //     .getAll()
  //     .subscribe((response) => expect(response).toBe(data))
  //   const req = httpTestingController.expectOne(`${api}/actions`)
  //   expect(req.request.method).toBe('GET')

  //   req.flush(data)

  // })
});
