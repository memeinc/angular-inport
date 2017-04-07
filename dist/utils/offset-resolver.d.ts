export declare class OffsetResolverFactory {
    static create(offset: Array<number> | number): OffsetResolver;
}
export declare class OffsetResolver {
    private offset;
    constructor(offset: Array<number> | number);
    normalizeOffset(): number[];
}
