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
var WindowRulerStatic = (function () {
    function WindowRulerStatic() {
    }
    WindowRulerStatic._createWindowRect = function () {
        var height = window.innerHeight;
        var width = window.innerWidth;
        return {
            top: 0,
            left: 0,
            bottom: height,
            right: width,
            height: height,
            width: width,
        };
    };
    WindowRulerStatic.onChange = function () {
        this._windowRect = this._createWindowRect();
    };
    WindowRulerStatic.getWindowViewPortRuler = function () {
        return this._windowRect;
    };
    return WindowRulerStatic;
}());
export { WindowRulerStatic };
var WindowRuler = (function () {
    function WindowRuler() {
        WindowRulerStatic.onChange();
    }
    WindowRuler.prototype.onChange = function () {
        WindowRulerStatic.onChange();
    };
    WindowRuler.prototype.getWindowViewPortRuler = function () {
        return WindowRulerStatic.getWindowViewPortRuler();
    };
    return WindowRuler;
}());
WindowRuler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], WindowRuler);
export { WindowRuler };
//# sourceMappingURL=viewport-ruler.js.map