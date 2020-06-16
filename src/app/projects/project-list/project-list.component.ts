import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ProjectService} from '../../shared/project.service';
import {Project} from '../../shared/project.model';
import {EditMode} from '../../shared/editmode.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[];
  editMode: EditMode = EditMode.Undefined;
  subscription: Subscription;
  selectedIndex: number;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.subscription = this.projectService.projectsChanged.subscribe(projects => this.projects = projects );
  }

  onEdit(index: number) {
    this.editMode = EditMode.Update;
    this.selectedIndex = index;
  }

  onDelete(index: number) {
    this.projectService.deleteProject(index);
    this.editMode = EditMode.Undefined;
  }

  onNew() {
    this.editMode = EditMode.Add;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
