import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {ProjectService} from '../../shared/project.service';
import {EditMode} from '../../shared/editmode.model';
import {Project} from '../../shared/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {
  @ViewChild('form', { static: true }) projectForm: NgForm;
  @Input() selectedIndex: number;
  @Input() editMode;
  @Output() editModeChange = new EventEmitter<string>();
  customers: string[];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.customers = this.projectService.getCustomers();
  }

  ngOnChanges() {
    if (this.editMode === EditMode.Update) {
      const selectedProject = this.projectService.getProject(this.selectedIndex);
      this.projectForm.setValue({
        task: selectedProject.task,
        operations: selectedProject.operations,
        customer: selectedProject.customer,
        duration: selectedProject.duration,
        technics: selectedProject.technics
      });
    } else if (this.editMode === EditMode.Add) {
      this.initForm(this.projectForm, {task: '', operations: '', customer: '', duration: '', technics: ''});
    }
  }

  onCancel() {
    this.projectForm.reset();
    this.editModeChange.emit(EditMode.Undefined);
  }

  onSubmit(form: NgForm) {
    const newProject = form.value;
    if (this.editMode === EditMode.Update) {
      this.projectService.updateProject(this.selectedIndex, newProject);
    } else {
      this.projectService.addProject(newProject);
    }
    this.onCancel();
  }

  initForm(form: NgForm, project: Project): void {
    form.setValue({
      task: project.task,
      operations: project.operations,
      customer: project.customer,
      duration: project.duration,
      technics: project.technics
    });
  }

  isEditModeDefined() {
    return (this.editMode !== EditMode.Undefined);
  }
}
