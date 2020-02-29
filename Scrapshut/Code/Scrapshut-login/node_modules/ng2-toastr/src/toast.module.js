"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var toast_container_component_1 = require("./toast-container.component");
var toast_manager_1 = require("./toast-manager");
var toast_options_1 = require("./toast-options");
var ToastModule = (function () {
    function ToastModule() {
    }
    ToastModule.forRoot = function () {
        return {
            ngModule: ToastModule,
            providers: [toast_manager_1.ToastsManager, toast_options_1.ToastOptions],
        };
    };
    return ToastModule;
}());
ToastModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [toast_container_component_1.ToastContainer],
                exports: [toast_container_component_1.ToastContainer],
                entryComponents: [toast_container_component_1.ToastContainer]
            },] },
];
/** @nocollapse */
ToastModule.ctorParameters = function () { return []; };
exports.ToastModule = ToastModule;
//# sourceMappingURL=toast.module.js.map