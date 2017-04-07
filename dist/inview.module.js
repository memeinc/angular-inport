var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { InviewDirective } from './inview.directive';
import { InviewContainerDirective } from './inview-container.directive';
import { InviewItemDirective } from './inview-item.directive';
import { ScrollObservable } from './utils/scroll-observable';
import { WindowRuler } from './utils/viewport-ruler';
var NgInviewModule = (function () {
    function NgInviewModule() {
    }
    return NgInviewModule;
}());
NgInviewModule = __decorate([
    NgModule({
        imports: [],
        declarations: [InviewDirective, InviewContainerDirective, InviewItemDirective],
        exports: [InviewDirective, InviewContainerDirective, InviewItemDirective],
        providers: [ScrollObservable, WindowRuler]
    })
], NgInviewModule);
export { NgInviewModule };
//# sourceMappingURL=inview.module.js.map