"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ToastOptions = (function () {
    function ToastOptions() {
        this.positionClass = 'toast-top-right';
        this.maxShown = 5;
        this.newestOnTop = false;
        this.animate = 'fade';
        // override-able properties
        this.toastLife = 5000;
        this.enableHTML = false;
        this.dismiss = 'auto'; //'auto' | 'click' | 'controlled'
        this.messageClass = 'toast-message';
        this.titleClass = 'toast-title';
        this.showCloseButton = false;
    }
    return ToastOptions;
}());
ToastOptions.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ToastOptions.ctorParameters = function () { return []; };
exports.ToastOptions = ToastOptions;
//# sourceMappingURL=toast-options.js.map