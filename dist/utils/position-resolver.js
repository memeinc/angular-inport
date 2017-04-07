function isPercent(value) {
    return typeof value === 'string' && value.indexOf('%') > -1;
}
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
var PositionResolver = (function () {
    function PositionResolver() {
    }
    PositionResolver.getBoundingClientRect = function (element) {
        return element.getBoundingClientRect();
    };
    PositionResolver.isVisible = function (element) {
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    };
    PositionResolver.intersectRect = function (r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };
    PositionResolver.offsetRect = function (rect, offset) {
        if (!offset) {
            return rect;
        }
        var offsetObject = {
            top: isPercent(offset[0]) ? (parseFloat(offset[0]) * rect.height) : offset[0],
            right: isPercent(offset[1]) ? (parseFloat(offset[1]) * rect.width) : offset[1],
            bottom: isPercent(offset[2]) ? (parseFloat(offset[2]) * rect.height) : offset[2],
            left: isPercent(offset[3]) ? (parseFloat(offset[3]) * rect.width) : offset[3]
        };
        return {
            top: rect.top - offsetObject.top,
            left: rect.left - offsetObject.left,
            bottom: rect.bottom + offsetObject.bottom,
            right: rect.right + offsetObject.right,
            height: rect.height + offsetObject.top + offsetObject.bottom,
            width: rect.width + offsetObject.left + offsetObject.right
        };
    };
    PositionResolver.distance = function (containerRect, elementRect) {
        var middlePointOfContainer = {
            x: containerRect.height / 2,
            y: containerRect.width / 2
        };
        var middlePointOfElement = {
            x: elementRect.top + (elementRect.height / 2),
            y: elementRect.left + (elementRect.width / 2)
        };
        return distance(middlePointOfContainer, middlePointOfElement);
    };
    PositionResolver.inviewPercentage = function (containerRect, elementRect) {
        return {
            top: 100 * elementRect.top / containerRect.top,
            left: 100 * elementRect.left / containerRect.left,
            bottom: 100 * elementRect.bottom / containerRect.bottom,
            right: 100 * elementRect.right / containerRect.right
        };
    };
    PositionResolver.inViewParts = function (containerRect, elementRect) {
        return {
            top: elementRect.top >= containerRect.top,
            left: elementRect.left >= containerRect.left,
            bottom: elementRect.bottom <= containerRect.bottom,
            right: elementRect.right <= containerRect.right
        };
    };
    PositionResolver.isElementOutsideView = function (elementBounds, containersBounds) {
        var outsideAbove = elementBounds.bottom < containersBounds.top;
        var outsideBelow = elementBounds.top > containersBounds.bottom;
        var outsideLeft = elementBounds.right < containersBounds.left;
        var outsideRight = elementBounds.left > containersBounds.right;
        return outsideAbove || outsideBelow || outsideLeft || outsideRight;
    };
    PositionResolver.isElementClipped = function (elementBounds, containersBounds) {
        var clippedAbove = elementBounds.top < containersBounds.top;
        var clippedBelow = elementBounds.bottom > containersBounds.bottom;
        var clippedLeft = elementBounds.left < containersBounds.left;
        var clippedRight = elementBounds.right > containersBounds.right;
        return clippedAbove || clippedBelow || clippedLeft || clippedRight;
    };
    PositionResolver.clippedStatus = function (elementBounds, containersBounds) {
        return {
            isClipped: this.isElementClipped(elementBounds, containersBounds),
            isOutsideView: this.isElementOutsideView(elementBounds, containersBounds)
        };
    };
    return PositionResolver;
}());
export { PositionResolver };
//# sourceMappingURL=position-resolver.js.map