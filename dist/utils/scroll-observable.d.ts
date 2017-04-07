import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/share';
import { WindowRuler } from './viewport-ruler';
import { WindowElement } from './models';
export declare class ScrollObservable {
    private _windowRuler;
    static _globalObservable: Observable<any>;
    static _elementObservableReferences: Map<WindowElement, Observable<any>>;
    static isWindow(windowElement: WindowElement): any;
    constructor(_windowRuler: WindowRuler);
    private _getGlobalObservable();
    scrollObservableFor(windowElement: WindowElement): Observable<any>;
    private _createElementObservable(windowElement);
}
