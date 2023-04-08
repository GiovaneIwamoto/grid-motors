//---------- DATA TRANSFER OBJECT ----------

export class CreateReserveDTO {
    start_date: Date;
    end_date: Date;
    id_car: string;

    constructor(start_date: Date, end_date: Date, id_car: string) {
        this.start_date = start_date;
        this.end_date = end_date;
        this.id_car = id_car;
    }
}
