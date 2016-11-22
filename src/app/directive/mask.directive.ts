import { Directive, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Directive({
    selector: '[rpl-mask]',
})
export class MaskDirective implements ControlValueAccessor {

    constructor(private c: NgControl, private elRef: ElementRef) {
        c.valueAccessor = this;
    }

    registerOnChange(fn: any): void { }
    registerOnTouched(fn: any): void { }

    writeValue(value: any) {
        this.elRef.nativeElement.value = value;
        console.log("writeValue called", value);
    }

}