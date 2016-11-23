import {MaskDirective} from './app/directive/mask.directive';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MaskDirective
    ],
    exports: [
        MaskDirective
    ]
})
export class CurrencyMaskModule {
}