import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ProjectService } from '../../../shared/service-proxies/service-proxies';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  @ViewChild('createProjectModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  // tslint:disable-next-line:no-output-rename
  @Output('value') FV = new EventEmitter();

  active = false;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private projectService: ProjectService) {
  }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: [''],
      dateStrart: [''],
      dateEnd: [''],
      sizeId: {
        id: ['']
      },
      projecTypeId: {
        id: ['']
      }
    });
  }
  show(): void {
    this.active = true;
    this.modal.show();
  }
  close(): void {
    this.active = false;
    this.modal.hide();
    console.log('nono', this.addForm)
  }
  onSubmit() {
    this.projectService.createProject(this.addForm.value)
      .subscribe(data => {
        this.FV.emit(data);
        abp.notify.info('Added Successfully');
        this.close();
      });
  }

}
