import { GroupParser } from '../parse/group-parser';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Directive({
    selector: '[rpl-mask]',
})
export class MaskDirective implements ControlValueAccessor {
    private groups: GroupParser[] = new Array();
    private value:string;

    constructor(private c: NgControl, private elRef: ElementRef) {
        c.valueAccessor = this;
        this.groups.push(new GroupParser('999-999'));
    }

    @HostListener('keypress', ['$event']) onMouseEnter(event: KeyboardEvent) {
        if(event.key==="Backspace"){
            this.value = this.value.substring(0, this.value.length - 1);
            this.elRef.nativeElement.value = this.groups[0].parseAll(this.value);
            return false;
        }
        let result = this.groups[0].parse(event.key);
        if(!result.accept) return false;
        this.value += event.key;
        this.elRef.nativeElement.value = result.result;
        return false;
    }

    registerOnChange(fn: any): void { }
    registerOnTouched(fn: any): void { }

    writeValue(value: any) {
        this.value = value == null ? "" : value + "";
        this.elRef.nativeElement.value = this.groups[0].parseAll(value); 
    }

}