import { Component, OnInit } from '@angular/core';
import { Consultation } from 'src/app/model/Consultation';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
  consultations : Consultation[] = [];
  currentConsultation: Consultation|null = null;

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
    this.updateItems();
    
  }

  public updateItems(){
    this.dataBaseService.getConsultations().subscribe(res =>{
      this.consultations = res;
      this.consultations.forEach(ele =>{
        ele.consultationdate = new Date(ele.consultationdate);
      });
    })
  }

  public getTime(x : Consultation): string{
    return x.consultationdate.toLocaleTimeString();
  }

  public accept(x: Consultation) {
    this.dataBaseService.changeConsultation(x).subscribe(res=>{
      this.updateItems();
      this.currentConsultation = x;
    });
  }

  public finishConsultation(){
    if(this.currentConsultation !== null){
      this.dataBaseService.deleteConsultation(this.currentConsultation.id).subscribe(res=>{
        this.currentConsultation = null;
      });
      
    }
  }

}
