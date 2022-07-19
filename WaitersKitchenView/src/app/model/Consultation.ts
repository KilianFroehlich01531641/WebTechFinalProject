export class Consultation{
    id: number;
    tablenumber: number;
    consultationdate: Date;
    comment: string;
    status: string;

    constructor(id: number, tablenumber: number, consultationdate: Date, comment: string, status: string){
        this.id = id;
        this.tablenumber = tablenumber;
        this.consultationdate = consultationdate;
        this.comment = comment;
        this.status = status;
    }
}