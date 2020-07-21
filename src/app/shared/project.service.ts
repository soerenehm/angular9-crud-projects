import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

import {Project} from './project.model';


@Injectable({providedIn: 'root'})
export class ProjectService {

  private customers = ['Online-Versandhandel', 'Partnervermittlung', 'Telekommunikation'];
  private projects: Project[] = [];

  projectsChanged = new Subject<Project[]>();
  errorOccurred = new Subject<any>();

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  getCustomers(): string[] {
    return this.customers.slice();
  }

  getProjects(): Project[] {
    const url = 'http://localhost/projects';

    this.httpClient.get<Project[]>(url, this.httpOptions).subscribe(
      (responseData: Project[]) => {
        this.projects = responseData;
        this.projectsChanged.next(this.projects.slice());
      },
      (err: any) => {
        this.handleError(err);
      });
    return this.projects.slice();
  }

  getProject(index: number): Project {
    return this.projects[index];
  }

  deleteProject(index: number): void {
    const url = 'http://localhost/projects/' + this.projects[index]['id'];

    this.httpClient.delete<{}>(url, this.httpOptions).subscribe(
      () => {
        this.projects.splice(index, 1);
        this.projectsChanged.next(this.projects.slice());
      },
      err => {
        this.handleError(err);
      });
  }

  updateProject(index: number, project: Project): void {
    const url = 'http://localhost/projects/' + project.id;

    this.httpClient.put<Project>(url, project, this.httpOptions).subscribe(
      (responseData: Project) => {
        this.projects[index] = responseData;
        this.projectsChanged.next(this.projects.slice());
      },
      err => {
        this.handleError(err);
      });
  }

  addProject(project: Project): void {
    const url = 'http://localhost/projects';

    this.httpClient.post<Project>(url, project, this.httpOptions).subscribe(
      (responseData: Project) => {
        this.projects.push(responseData);
        this.projectsChanged.next(this.projects.slice());
      },
      err => {
        this.handleError(err);
      });
  }

  handleError(err: any): void {
    this.errorOccurred.next(err.message);
  }
}
