import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  loadForm: FormGroup
  tableDatas: []
  result: any

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) { }
  
  ngOnInit() {
    this.init()
  }

  init() {
    this.loadForm = this.fb.group({
      CodeOrder: ['', Validators.required],
      Stt:['', Validators.required]
    });
    this.loadTable()
  }

  getCode() {
    const { CodeOrder } = this.loadForm.value
    console.log(this.loadForm)
    const body = { CodeOrder }
    console.log(body)
    this.authService.loadFunct(body).subscribe(data=>{
      if (data.success) {
        this.result = data.result
        // this.router.navigate([''])
      }
      else {
        console.log(data)
      }
    })
    this.loadTable()
  }

  loadTable() {
    this.authService.getFunct().subscribe(data=>{
      if (data.success) {
        this.tableDatas = data.result
        console.log(this.tableDatas)
      }
    })
  }
}
