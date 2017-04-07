var OffsetResolverFactory = (function () {
    function OffsetResolverFactory() {
    }
    OffsetResolverFactory.create = function (offset) {
        return new OffsetResolver(offset);
    };
    return OffsetResolverFactory;
}());
export { OffsetResolverFactory };
var OffsetResolver = (function () {
    function OffsetResolver(offset) {
        this.offset = offset;
    }
    OffsetResolver.prototype.normalizeOffset = function () {
        if (!Array.isArray(this.offset)) {
            return [this.offset, this.offset, this.offset, this.offset];
        }
        if (this.offset.length === 2) {
            return this.offset.concat(this.offset);
        }
        else if (this.offset.length === 3) {
            return this.offset.concat([this.offset[1]]);
        }
        return this.offset;
    };
    return OffsetResolver;
}());
export { OffsetResolver };
//# sourceMappingURL=offset-resolver.js.map