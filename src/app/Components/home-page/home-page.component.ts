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
  setLink: FormGroup
  setNote: FormGroup
  setAddress: FormGroup
  setCost: FormGroup
  setPaid: FormGroup
  setOrder: FormGroup

  tableDatas: any = []
  result: any
  show: boolean = false

  openLink: boolean = false
  openNote: boolean = false
  openAddress: boolean = false
  openTracking: boolean = false
  openCost: boolean = false
  openPaid: boolean = false
  openOrder: boolean = false
  openTrack: boolean = false

  select: number = 0

  showLink: boolean = false
  showNote: boolean = false
  showAddress: boolean = false
  showTracking: boolean = false
  showCost: boolean = false
  showPaid: boolean = false
  showOrder: boolean = false
  showTrack: boolean = false

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.init()
  }

  showSelect() {
    this.show = true;
  }

  showInputLink(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openLink = true 
      }
      return data
    })
    this.tableDatas = obj
    this.showLink=true
  }

  showInputNote(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openNote = true 
      }
      return data
    })
    this.tableDatas = obj
    this.showNote=true
  }

  showInputAddress(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openAddress = true 
      }
      return data
    })
    this.tableDatas = obj
    this.showAddress=true
  }

  showInputCost(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openCost = true 
      }
      return data
    })
    this.tableDatas = obj
    this.showCost=true
  }

  showInputPaid(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openPaid = true 
      }
      return data
    })
    this.tableDatas = obj
    console.log(this.tableDatas)
    this.showPaid=true
  }

  linesNote(data){
    const content = data.replace(/,/g,"<br>")// regex expression all "," 
    console.log(content.length)
    return content;
  }

  linesTimeDeli(data){
    const content = data.replace(/,/g,"<br>")// regex expression all "," 
    console.log(content.length)
    return content;
  }

  linesAddress(data){
    const content = data.replace(/,/g,"<br>")
    console.log(content.length)
    return content;
  }

  linesTrackNum(data){
    const content = data.replace(/,/g,"<br>")
    console.log(content.length)
    return content;
  }

  checkData(data){
    let returnColor = {}
    switch (data) {
      case 'Return check':
        returnColor= {color: 'red', text: 'Return check'}
        break;
      case 'Check track again':
        returnColor= {color: 'orange', text: 'Check track again'}
        break;
      case 'Delivered':
        returnColor= {color: 'green', text: 'Delivered'}
        break;
      case 'In transit':
        returnColor= {color: '', text: 'In transit'}
        break;
      default:
        returnColor= {color: '', text: ''}
        break;
    }
    return returnColor
  }

  showInputOrder(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openOrder = true 
      }
      return data
    })
    this.tableDatas = obj
    this.showOrder=true
  }

  showInputTrack(id){
    this.defaultVariable()
    const obj = this.tableDatas.map(data=>{
      if (data.ID === id) {
        data.openTrack = true 
      }
      return data
    })
    this.tableDatas = obj
    this.showTrack=true
  }

  // enter: params, Stt, noneColumn
  onKeydown(data, value, id, column){
    if (data.key === "Enter") {
      console.log({data, value, id, column})
      let noneColumn = column
      let params = value
      let Stt = id
      if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
      const body = { params, Stt , noneColumn }
      console.log(body)
      this.authService.updateAColumn(body).subscribe(data => {
        if (data.success) {
          console.log(data.result)
          this.loadTable()
          alert("Update finish!")
        }
        else {
          alert("Update failed")
        }
      })
    }
  }

  inputData() {
    this.router.navigate(['input-item'])
  }

  updateStatus() {
    this.authService.updateFunct().subscribe(data => {
      if (data.success) {
        this.loadTable()
        alert("upload finish!")
      }
    })
  }

  init() {

    this.loadForm = this.fb.group({
      CodeOrder: ['', Validators.required],
      Stt: ['', Validators.required]
    })

    this.setLink = this.fb.group({
      linkProduct: ['', Validators.required],
      Stt: ['', Validators.required]
    })

    this.setNote = this.fb.group({
      note: ['', Validators.required],
      Stt: ['', Validators.required]
    })

    this.setAddress = this.fb.group({
      address: ['', Validators.required],
      Stt: ['', Validators.required]
    })

    this.setCost = this.fb.group({
      cost: ['', Validators.required],
      Stt: ['', Validators.required]
    })

    this.setPaid = this.fb.group({
      paid: ['', Validators.required],
      Stt: ['', Validators.required]
    })

    this.setOrder = this.fb.group({
      orderBy: ['', Validators.required],
      Stt: ['', Validators.required]
    })
    
    this.loadTable()
  }

  defaultVariable() {
    this.showLink = false
    this.showNote = false
    this.showAddress = false
    this.showTracking = false
    this.showCost = false
    this.showPaid = false
    this.showOrder = false
    this.showTrack = false
    
    this.openLink = false
    this.openNote = false
    this.openAddress = false
    this.openTracking = false
    this.openCost = false
    this.openPaid = false
    this.openOrder = false
    this.openTrack = false
  }


  showFormTracking() {
    this.defaultVariable()
    const numb = Number(this.select)
    switch (numb) {
      case 1:
        this.openLink = true
        break;
      case 2:
        this.openNote = true
        break;
      case 3:
        this.openAddress = true
        break;
      case 4:
        this.openTracking = true
        break;
      case 6:
        this.openCost = true
        break;
      case 5:
        this.openPaid = true
        break;
      case 7:
        this.openOrder = true
        break;
      default:
       break;
    }
  }

  // handle columns
  editLink() {
    console.log(this.setLink.value)
    let noneColumn = 1
    let params = this.setLink.value.linkProduct
    let Stt = this.setLink.value.Stt
    if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
    const body = { params, Stt , noneColumn }
    console.log(body)
    this.authService.updateAColumn(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Set link product finish!")
      }
      else {
        alert("Input link invalid")
      }
    })
  }

  editNote() {
    console.log(this.setNote.value)
    let noneColumn = 2
    let params = this.setNote.value.note
    let Stt = this.setNote.value.Stt
    if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
    const body = { params, Stt , noneColumn }
    console.log(body)
    this.authService.updateAColumn(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Set note finish!")
      }
      else {
        alert("Input note invalid")
      }
    })
  }

  editAddress() {
    console.log(this.setAddress.value)
    let noneColumn = 3
    let params = this.setAddress.value.address
    let Stt = this.setAddress.value.Stt
    if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
    const body = { params, Stt , noneColumn }
    console.log(body)
    this.authService.updateAColumn(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Set address finish!")
      }
      else {
        alert("Input address invalid")
      }
    })
  }

  editCost() {
    console.log(this.setCost.value)
    let noneColumn = 5
    let params = this.setCost.value.cost
    let Stt = this.setCost.value.Stt
    if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
    const body = { params, Stt , noneColumn }
    console.log(body)
    this.authService.updateAColumn(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Set link cost finish!")
      }
      else {
        alert("Input cost invalid")
      }
    })
  }

  editPaid() {
    console.log(this.setPaid.value)
    let noneColumn = 4
    let params = this.setPaid.value.paid
    let Stt = this.setPaid.value.Stt
    if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
    const body = { params, Stt , noneColumn }
    console.log(body)
    this.authService.updateAColumn(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Set link paid finish!")
      }
      else {
        alert("Input paid invalid")
      }
    })
  }

  editOrder() {
    console.log(this.setOrder.value)
    let noneColumn = 6
    let params = this.setOrder.value.orderBy
    let Stt = this.setOrder.value.Stt
    if (Stt > this.result || Stt <= 0) alert("Input ID invalid")
    const body = { params, Stt , noneColumn }
    console.log(body)
    this.authService.updateAColumn(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Set order by finish!")
      }
      else {
        alert("Input order by invalid")
      }
    })
  } 

  getCode() {
    const { CodeOrder, Stt } = this.loadForm.value
    if (Stt > this.result || Stt <= 0) alert("Inputs ID invalid")
    console.log(this.loadForm)
    const body = { CodeOrder, Stt }
    console.log(body)
    this.authService.loadFunct(body).subscribe(data => {
      if (data.success) {
        console.log(data.result)
        this.loadTable()
        alert("Get code finish!")
      }
      else {
        alert("Input code invalid!")
      }
    })
  }

  loadTable() {
    this.authService.getFunct().subscribe(data => {
      if (data.success) {
         const item = data.result.map(res=>{
          res.show = false
          return res
        })
        this.tableDatas = item
        // this.arrTimeDeli = this.tableDatas[0].timeDeli.split(",")
        console.log(this.tableDatas)
      }
    })
  }
}
