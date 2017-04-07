import { ElementBoundingPositions } from './models';
export declare class PositionResolver {
    static getBoundingClientRect(element: HTMLElement): ClientRect;
    static isVisible(element: HTMLElement): boolean;
    static intersectRect(r1: any, r2: any): boolean;
    static offsetRect(rect: any, offset: Array<any>): ClientRect;
    static distance(containerRect: any, elementRect: any): number;
    static inviewPercentage(containerRect: any, elementRect: any): {
        top: number;
        left: number;
        bottom: number;
        right: number;
    };
    static inViewParts(containerRect: any, elementRect: any): {
        top: boolean;
        left: boolean;
        bottom: boolean;
        right: boolean;
    };
    static isElementOutsideView(elementBounds: ElementBoundingPositions, containersBounds: ElementBoundingPositions): boolean;
    static isElementClipped(elementBounds: ElementBoundingPositions, containersBounds: ElementBoundingPositions): boolean;
    static clippedStatus(elementBounds: ElementBoundingPositions, containersBounds: ElementBoundingPositions): {
        isClipped: boolean;
        isOutsideView: boolean;
    };
}
