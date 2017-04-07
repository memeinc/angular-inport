export declare class WindowRulerStatic {
    private static _windowRect;
    private static _createWindowRect();
    static onChange(): void;
    static getWindowViewPortRuler(): ClientRect;
}
export declare class WindowRuler {
    constructor();
    onChange(): void;
    getWindowViewPortRuler(): ClientRect;
}
