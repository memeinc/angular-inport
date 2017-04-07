var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/share';
import { WindowRuler } from './viewport-ruler';
var ScrollObservable = ScrollObservable_1 = (function () {
    function ScrollObservable(_windowRuler) {
        this._windowRuler = _windowRuler;
        if (!ScrollObservable_1._globalObservable) {
            ScrollObservable_1._globalObservable = this._getGlobalObservable();
        }
    }
    ScrollObservable.isWindow = function (windowElement) {
        return Object.prototype.toString.call(windowElement).includes('Window');
    };
    ScrollObservable.prototype._getGlobalObservable = function () {
        var _this = this;
        return Observable.merge(Observable.fromEvent(window.document, 'scroll'), Observable.fromEvent(window, 'resize')
            .map(function (event) {
            _this._windowRuler.onChange();
            return event;
        })).share();
    };
    ScrollObservable.prototype.scrollObservableFor = function (windowElement) {
        if (ScrollObservable_1.isWindow(windowElement)) {
            return ScrollObservable_1._globalObservable;
        }
        if (ScrollObservable_1._elementObservableReferences.has(windowElement)) {
            return ScrollObservable_1._elementObservableReferences.get(windowElement);
        }
        var ref = this._createElementObservable(windowElement);
        ScrollObservable_1._elementObservableReferences.set(windowElement, ref);
        return ref;
    };
    ScrollObservable.prototype._createElementObservable = function (windowElement) {
        return Observable.fromEvent(windowElement, 'scroll').share();
    };
    return ScrollObservable;
}());
ScrollObservable._globalObservable = null;
ScrollObservable._elementObservableReferences = new Map();
ScrollObservable = ScrollObservable_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [WindowRuler])
], ScrollObservable);
export { ScrollObservable };
var ScrollObservable_1;
//# sourceMappingURL=scroll-observable.js.map