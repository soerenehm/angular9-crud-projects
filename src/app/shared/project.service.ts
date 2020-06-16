import {Project} from './project.model';
import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService {

  public customers = ['Telekommunikation', 'Online-Versandhandel', 'Versicherung'];

  projectsChanged = new Subject<Project[]>();

  projects: Project[] = [
    {
      task: 'Erweiterung und Integration einer auf REST und SOAP basierenden Spring Architektur' +
        ' für die Verarbeitung von JSON Daten für die App Entwicklung. ',
      operations: 'REST und SOAP Schnittstellenerweiterung und Integration,\n' +
        'Persistenz über Spring Data und JPA,\n' +
        'Testerstellung über MockMVC und WireMock',
      customer: 'Telekommunikation',
      duration: '7 Monate, 02/2018 - 08/2018',
      technics: 'Spring Boot, Spring Data, Java 8, REST, SOAP, JSON, MockMVC, WireMock'

    },
    {
      task: '(Weiter-)Entwicklung des firmeneigenen Basis-Frameworks, basierend auf Spring und Vaadin. ',
      operations: 'Funktionale Weiterentwicklung des Basis-Frameworks,\n' +
      'Fehlerkorrektur bestehender Funktionalitäten',
      customer: 'Online-Versandhandel',
      duration: '2 Monate, 08/2017 - 09/2017',
      technics: 'Spring Framework, Vaadin, JavaScript, Tomcat, JRebel, Maven, Git'
    }
  ];

  getCustomers() {
    return this.customers.slice();
  }

  getProjects() {
    return this.projects.slice();
  }

  getProject(index: number) {
    return this.projects[index];
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    this.projectsChanged.next(this.projects.slice());
  }

  updateProject(index: number, project: Project) {
    this.projects[index] = project;
    this.projectsChanged.next(this.projects.slice());
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.projectsChanged.next(this.projects.slice());
  }
}
