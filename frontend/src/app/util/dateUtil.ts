import { DatePipe } from "@angular/common";

export class DateUtil {
  private dateFormatted;
  constructor(private datePipe: DatePipe) {}

  formatDate(date) {
    this.dateFormatted = this.datePipe.transform(date, "dd/MM/yyyy");
    return this.dateFormatted;
  }
}
