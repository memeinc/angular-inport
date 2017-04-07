var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ContentChildren, QueryList, Input, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { InviewItemDirective } from './inview-item.directive';
import { ScrollObservable } from './utils/scroll-observable';
import { WindowRuler } from './utils/viewport-ruler';
import { OffsetResolverFactory } from './utils/offset-resolver';
import { PositionResolver } from './utils/position-resolver';
// allmost same configuration as child
// child will not have inview property? to trigger changes
// will use scroll on this or window
// will check wheather the child is in view port
// will start checking from last inview child and with direction of scroll until a child is not visible
// can return all inview children
// or best match case
// if container is used then first check if container itself is in the viewport of the window.
// then only the futher calculation should take place
var InviewContainerDirective = (function () {
    function InviewContainerDirective(_element, _scrollObservable, _windowRuler, _zone) {
        this._element = _element;
        this._scrollObservable = _scrollObservable;
        this._windowRuler = _windowRuler;
        this._zone = _zone;
        this._throttleType = 'debounce';
        this._offset = [0, 0, 0, 0];
        this._viewPortOffset = [0, 0, 0, 0];
        this._throttle = 0;
        this._scrollWindow = true;
        this._lastScrollY = 0;
        this._scrollDirection = 'down';
        this.inview = new EventEmitter();
    }
    Object.defineProperty(InviewContainerDirective.prototype, "offset", {
        set: function (offset) {
            this._offset = OffsetResolverFactory.create(offset).normalizeOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewContainerDirective.prototype, "viewPortOffset", {
        set: function (offset) {
            this._viewPortOffset = OffsetResolverFactory.create(offset).normalizeOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewContainerDirective.prototype, "throttle", {
        set: function (throttle) {
            this._throttle = throttle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewContainerDirective.prototype, "scrollWindow", {
        set: function (sw) {
            this._scrollWindow = !!sw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewContainerDirective.prototype, "data", {
        set: function (_d) {
            this._data = _d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InviewContainerDirective.prototype, "bestMatch", {
        set: function (bm) {
            this._bestMatch = !!bm;
        },
        enumerable: true,
        configurable: true
    });
    InviewContainerDirective.prototype.ngOnInit = function () { };
    InviewContainerDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._scrollSuscription = this._scrollObservable.scrollObservableFor(this._scrollWindow ? window : this._element.nativeElement)[this._throttleType](function () { return Observable.timer(_this._throttle); })
            .filter(function () { return true; })
            .mergeMap(function (event) { return Observable.of(_this._getViewPortRuler()); })
            .do(function () { return _this._checkScrollDirection(); })
            .subscribe(function (containersBounds) { return _this.handleOnScroll(containersBounds); });
    };
    InviewContainerDirective.prototype._checkScrollDirection = function () {
        if (this._scrollWindow) {
            this._scrollDirection = (window.scrollY > this._lastScrollY) ? 'down' : 'up';
            this._lastScrollY = window.scrollY;
        }
        else {
            this._scrollDirection = (this._element.nativeElement.scrollTop > this._lastScrollY) ? 'down' : 'up';
            this._lastScrollY = this._element.nativeElement.scrollTop;
        }
    };
    InviewContainerDirective.prototype._getViewPortRuler = function () {
        return this._scrollWindow ? this._windowRuler.getWindowViewPortRuler() : PositionResolver.getBoundingClientRect(this._element.nativeElement);
    };
    InviewContainerDirective.prototype.ngOnDestroy = function () {
        if (this._scrollSuscription) {
            this._scrollSuscription.unsubscribe();
        }
    };
    InviewContainerDirective.prototype.handleOnScroll = function (containersBounds) {
        var _this = this;
        // check of scroll up or down
        // Note:: check all children from parent if it is in view or not
        // for cache of less iterations start from the last visible  item then based on scroll up and down check list futher
        var viewPortOffsetRect = PositionResolver.offsetRect(containersBounds, this._viewPortOffset);
        var visibleChildren = [];
        if (this._inviewChildren) {
            visibleChildren = this._inviewChildren.toArray().filter(function (child) {
                var elementOffsetRect = PositionResolver.offsetRect(child.getELementRect(), _this._offset);
                return child.isVisible() && PositionResolver.intersectRect(elementOffsetRect, viewPortOffsetRect);
            });
            if (this._bestMatch) {
                var bestMatchChild_1;
                if (visibleChildren.length) {
                    visibleChildren.reduce(function (distance, currChild) {
                        var _distance = PositionResolver.distance(viewPortOffsetRect, PositionResolver.offsetRect(currChild.getELementRect(), _this._offset));
                        if (distance > _distance) {
                            bestMatchChild_1 = currChild;
                            return _distance;
                        }
                        return distance;
                    }, Infinity);
                }
                var data_1 = bestMatchChild_1 ? bestMatchChild_1.getData() : {};
                data_1.direction = this._scrollDirection;
                this._zone.run(function () { return _this.inview.emit(data_1); });
            }
            else {
                var data_2 = {};
                data_2.inview = visibleChildren.map(function (vc) { return vc.getData(); });
                data_2.direction = this._scrollDirection;
                this._zone.run(function () { return _this.inview.emit(data_2); });
            }
        }
    };
    return InviewContainerDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewContainerDirective.prototype, "offset", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewContainerDirective.prototype, "viewPortOffset", null);
__decorate([
    Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], InviewContainerDirective.prototype, "throttle", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], InviewContainerDirective.prototype, "scrollWindow", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewContainerDirective.prototype, "data", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InviewContainerDirective.prototype, "bestMatch", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InviewContainerDirective.prototype, "inview", void 0);
__decorate([
    ContentChildren(InviewItemDirective),
    __metadata("design:type", QueryList)
], InviewContainerDirective.prototype, "_inviewChildren", void 0);
InviewContainerDirective = __decorate([
    Directive({
        selector: '[in-view-container]'
    }),
    __metadata("design:paramtypes", [ElementRef,
        ScrollObservable,
        WindowRuler,
        NgZone])
], InviewContainerDirective);
export { InviewContainerDirective };
//# sourceMappingURL=inview-container.directive.js.map