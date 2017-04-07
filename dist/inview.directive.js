var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ScrollObservable } from './utils/scroll-observable';
import { OffsetResolverFactory } from './utils/offset-resolver';
import { PositionResolver } from './utils/position-resolver';
import { WindowRuler } from './utils/viewport-ruler';
;
var InviewDirective = (function () {
    function InviewDirective(_scrollObservable, _element, _zone, _windowRuler) {
        this._scrollObservable = _scrollObservable;
        this._element = _element;
        this._zone = _zone;
        this._windowRuler = _windowRuler;
        this._throttleType = 'debounce';
        this._offset = [0, 0, 0, 0];
        this._viewPortOffset = [0, 0, 0, 0];
        this._throttle = 0;
        this._lazy = false; // when visible only then.
        this._tooLazy = false; // when state changes only then.
        this.inview = new EventEmitter();
    }
    Object.defineProperty(InviewDirective.prototype, "offset", {
        set: function (offset) {
            this._offset = OffsetResolverFactory.create(offset).normalizeOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewDirective.prototype, "viewPortOffset", {
        set: function (offset) {
            this._viewPortOffset = OffsetResolverFactory.create(offset).normalizeOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewDirective.prototype, "throttle", {
        set: function (throttle) {
            this._throttle = throttle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewDirective.prototype, "scrollELement", {
        set: function (sw) {
            this._scrollElement = sw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewDirective.prototype, "lazy", {
        set: function (lzy) {
            this._lazy = lzy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewDirective.prototype, "tooLazy", {
        set: function (lzy) {
            this._tooLazy = lzy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewDirective.prototype, "data", {
        set: function (_d) {
            this._data = _d;
        },
        enumerable: true,
        configurable: true
    });
    InviewDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._scrollerSubscription = this._scrollObservable.scrollObservableFor(this._scrollElement || window)[this._throttleType](function () { return Observable.timer(_this._throttle); })
            .filter(function () { return true; })
            .mergeMap(function (event) { return Observable.of(_this._getViewPortRuler()); })
            .subscribe(function (containersBounds) { return _this.handleOnScroll(containersBounds); });
    };
    InviewDirective.prototype._getViewPortRuler = function () {
        return this._scrollElement ? PositionResolver.getBoundingClientRect(this._scrollElement) : this._windowRuler.getWindowViewPortRuler();
    };
    InviewDirective.prototype.ngOnInit = function () { };
    InviewDirective.prototype.ngOnDestroy = function () {
        if (this._scrollerSubscription) {
            this._scrollerSubscription.unsubscribe();
        }
    };
    InviewDirective.prototype.handleOnScroll = function (containersBounds) {
        var _this = this;
        var viewPortOffsetRect = PositionResolver.offsetRect(containersBounds, this._viewPortOffset);
        var elementOffsetRect = PositionResolver.offsetRect(PositionResolver.getBoundingClientRect(this._element.nativeElement), this._offset);
        var isVisible = PositionResolver.isVisible(this._element.nativeElement) && PositionResolver.intersectRect(elementOffsetRect, viewPortOffsetRect);
        if (this._tooLazy && this._previous_state !== undefined && (this._previous_state === isVisible)) {
            return;
        }
        var output = { status: isVisible };
        if (this._data !== undefined) {
            output.data = this._data;
        }
        if (!this._lazy && !isVisible) {
            output.isClipped = false;
            output.isOutsideView = true;
            output.parts = { top: false, right: false, left: false, bottom: false };
            this._zone.run(function () { return _this.inview.emit(output); });
        }
        if (!isVisible) {
            this._previous_state = isVisible;
            return;
        }
        var _a = PositionResolver.clippedStatus(elementOffsetRect, viewPortOffsetRect), isClipped = _a.isClipped, isOutsideView = _a.isOutsideView;
        output.isClipped = isClipped;
        output.isOutsideView = isOutsideView;
        output.parts = PositionResolver.inViewParts(viewPortOffsetRect, elementOffsetRect);
        this._zone.run(function () { return _this.inview.emit(output); });
        this._previous_state = isVisible;
    };
    return InviewDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewDirective.prototype, "offset", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewDirective.prototype, "viewPortOffset", null);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], InviewDirective.prototype, "throttle", null);
__decorate([
    Input(),
    __metadata("design:type", HTMLElement),
    __metadata("design:paramtypes", [HTMLElement])
], InviewDirective.prototype, "scrollELement", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], InviewDirective.prototype, "lazy", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], InviewDirective.prototype, "tooLazy", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewDirective.prototype, "data", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InviewDirective.prototype, "inview", void 0);
InviewDirective = __decorate([
    Directive({
        selector: '[in-view]'
    }),
    __metadata("design:paramtypes", [ScrollObservable,
        ElementRef,
        NgZone,
        WindowRuler])
], InviewDirective);
export { InviewDirective };
//# sourceMappingURL=inview.directive.js.map