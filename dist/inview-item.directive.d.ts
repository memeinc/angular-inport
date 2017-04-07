import { OnInit, ElementRef } from '@angular/core';
export declare class InviewItemDirective implements OnInit {
    private _element;
    private _data;
    private _id;
    data: any;
    id: any;
    constructor(_element: ElementRef);
    ngOnInit(): void;
    getELementRect(): ClientRect;
    isVisible(): boolean;
    getData(): any;
}
