import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { QuotationService, CustomerService, ProjectService } from '@shared/service-proxies/service-proxies';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Quotation, CreateQuotation } from './../../../models/quotation.model';
import {Customer} from 'models/customer.model';
import {Project} from 'models/project'

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.css']
})
export class CreateQuotationComponent implements OnInit {
  // tslint:disable-next-line:no-output-rename
  // @Output('value') FV = new EventEmitter();

  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  active = false;
  quotation:       Quotation [];
  createQuotation: CreateQuotation [];
  custumer:        Customer  [];
  project:         Project   [];

  @ViewChild('createQuotationModel') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;
  // createForm:  FormGroup;
  createForm = new FormGroup({
    listworkItem: new FormArray([
      new FormControl('taskname'),
      new FormControl('codingEffort'),
    ]),
    effortList: new FormArray([])
  });


    constructor(
      public quotationservice: QuotationService,
      public custumerService:  CustomerService,
      public projectService:   ProjectService,
      private formBuilder:     FormBuilder,
    ) {}

  ngOnInit() {
    this.initWorkItem();
    this.getQuotation();
    this.getCustumer();
    this.getProject();

    this.createForm = this.formBuilder.group({
      projectID: [''],                          // get data from  menu dropdown
      customerID: [''],                        // get data from  menu dropdown
      listworkItem : this.formBuilder.array([
        this.addListworkItem(),
      ]),
      effortList: this.formBuilder.array([])
    });
  }
  get listworkItem(): FormArray {
    return this.createForm.get('listworkItem') as FormArray;
  }
  addListworkItem() {
    this.listworkItem.push(new FormControl());
  }

  initWorkItem() {
    return this.formBuilder.group({
      taskname: [''],     // get data from input
      codingEffort: [''] //
    })
  }


  getQuotation(): void {
    this.quotationservice.getQuotation()
    .subscribe(data => {
      this.quotation = data
    });
  }

  getProject(): void {
    this.projectService.getProjects()
    .subscribe(data => {
      this.project = data
    });
  }

  getCustumer(): void {
    this.custumerService.getCustomer()
    .subscribe(data => {
      this.custumer = data
    });
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = null;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  show(): void {
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
   // debugger;
   console.log('helloVN', this.createForm.value)

  }

  onSubmit(Fdata) {
   // debugger;
   console.log(Fdata);
    this.quotationservice.createQuotation(this.createForm.value)
      .subscribe(data => {
        // this.FV.emit(data);
        abp.notify.info('Added Successfully');
        this.close();
  });
  }
}
