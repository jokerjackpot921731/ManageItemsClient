import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.css']
})
export class InputItemComponent implements OnInit {
  saveForm: FormGroup
  tableDatas: any = []
  result: any
  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.saveForm = this.fb.group({
      linkProduct: ['', Validators.required],
      note: ['', Validators.required],
      address: ['', Validators.required],
      paid: ['', Validators.required],
      costSite: ['', Validators.required],
      orderBy: ['', Validators.required]
    })

    this.loadTable()
  }

  backHome() {
    this.router.navigate([''])
  }

  loadTable() {
    this.authService.getFunct().subscribe(data=>{
      if (data.success) {
        this.tableDatas = data.result
        this.result = data.result.length
        console.log(this.tableDatas)
      }
    })
  }

  saveItem() {
    const { linkProduct, note, address, paid, costSite, orderBy } = this.saveForm.value
    const body =  { linkProduct, note, address, paid, costSite, orderBy }
    this.authService.saveFunct(body).subscribe(data=>{
      if (data.success) {
        console.log(data.result)
        this.router.navigate(['input-item'])
        this.loadTable()
      }
      else {
        alert("Inputs item invalid")
      }
    })
  }


}
