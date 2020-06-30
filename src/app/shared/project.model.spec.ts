import {of} from 'rxjs';

import {ProjectService} from './project.service';
import {Projects} from '@angular/cli/lib/config/schema';


describe('ProjectService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let projectSerice: ProjectService;


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    projectSerice = new ProjectService(<any> httpClientSpy);
  });


  it('should return expected projects (HttpClient called once)', () => {
    const expectedProjects: Projects[] = [{
      id: 1,
      task: 'Fullstack UI und API Entwicklung von Services für die Online Anzeige von Artikeln.',
      operations: 'Fachliche Erweiterungen in Spring Microservices, Testerstellung für Front- und Backend, Planning und Estimation im Scrum Prozess',
      customer: 'Online-Versandhandel',
      duration: '3 Monate, 03/2020 - 05/2020',
      technics: 'Spring Framework, Java 11, AWS Services, Python, JavaScript, Preact, JUnit, Jasmine, TestCafe, Togglz, FreeMarker'
    }];

    httpClientSpy.get.and.returnValue(of(expectedProjects));

    expect(JSON.stringify(projectSerice.getProjects())).toEqual(JSON.stringify(expectedProjects));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
