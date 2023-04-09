//---------- DATA TRANSFER OBJECT ----------

export class UpdateReserveDTO {
    id_user: string;
    start_date: Date;
    end_date: Date;
    id_car: string;
    final_value: number;

    constructor(
        id_user: string,
        start_date: Date,
        end_date: Date,
        id_car: string,
        final_value: number
    ) {
        this.id_user = id_user;
        this.start_date = start_date;
        this.end_date = end_date;
        this.id_car = id_car;
        this.final_value = final_value;
    }
}
