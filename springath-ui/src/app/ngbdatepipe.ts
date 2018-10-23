import {Pipe, PipeTransform} from "@angular/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Pipe({name: 'ngbdate'})
export class NgbDatePipe implements PipeTransform {
	transform(value: NgbDateStruct, ...args: any[]): Date {
		if (!value) {
			return null;
		}
		return new Date(value.year, value.month, value.day, 0, 0, 0, 0);
	}
}