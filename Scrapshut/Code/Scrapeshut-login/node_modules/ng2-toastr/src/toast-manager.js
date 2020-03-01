"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toast_container_component_1 = require("./toast-container.component");
var toast_options_1 = require("./toast-options");
var toast_1 = require("./toast");
var Subject_1 = require("rxjs/Subject");
var ToastsManager = (function () {
    function ToastsManager(componentFactoryResolver, ngZone, appRef, options) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngZone = ngZone;
        this.appRef = appRef;
        this.options = options;
        this.index = 0;
        this.toastClicked = new Subject_1.Subject();
    }
    ToastsManager.prototype.setRootViewContainerRef = function (vRef) {
        this._rootViewContainerRef = vRef;
    };
    ToastsManager.prototype.onClickToast = function () {
        return this.toastClicked.asObservable();
    };
    ToastsManager.prototype.show = function (toast, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.container) {
                // get app root view component ref
                if (!_this._rootViewContainerRef) {
                    try {
                        _this._rootViewContainerRef = _this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
                    }
                    catch (e) {
                        reject(new Error('Please set root ViewContainerRef using setRootViewContainerRef(vRef: ViewContainerRef) method.'));
                    }
                }
                // get options providers
                var providers = core_1.ReflectiveInjector.resolve([
                    { provide: toast_options_1.ToastOptions, useValue: _this.options }
                ]);
                // create and load ToastContainer
                var toastFactory = _this.componentFactoryResolver.resolveComponentFactory(toast_container_component_1.ToastContainer);
                var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, _this._rootViewContainerRef.parentInjector);
                _this.container = _this._rootViewContainerRef.createComponent(toastFactory, _this._rootViewContainerRef.length, childInjector);
                _this.container.instance.onToastClicked = function (toast) {
                    _this._onToastClicked(toast);
                };
                _this.container.instance.onExit().subscribe(function () {
                    _this.dispose();
                });
            }
            resolve(_this.setupToast(toast, options));
        });
    };
    ToastsManager.prototype.createTimeout = function (toast) {
        var _this = this;
        var task;
        this.ngZone.runOutsideAngular(function () {
            task = setTimeout(function () { return _this.ngZone.run(function () { return _this.clearToast(toast); }); }, toast.config.toastLife);
        });
        return task.toString();
    };
    ToastsManager.prototype.setupToast = function (toast, options) {
        toast.id = ++this.index;
        if (options && options.hasOwnProperty('toastLife')) {
            options.dismiss = 'auto';
        }
        var customConfig = Object.assign({}, this.options, options || {});
        Object.keys(toast.config).forEach(function (k) {
            if (customConfig.hasOwnProperty(k)) {
                toast.config[k] = customConfig[k];
            }
        });
        if (toast.config.dismiss === 'auto') {
            toast.timeoutId = this.createTimeout(toast);
        }
        this.container.instance.addToast(toast);
        return toast;
    };
    ToastsManager.prototype._onToastClicked = function (toast) {
        this.toastClicked.next(toast);
        if (toast.config.dismiss === 'click') {
            this.clearToast(toast);
        }
    };
    ToastsManager.prototype.dismissToast = function (toast) {
        this.clearToast(toast);
    };
    ToastsManager.prototype.clearToast = function (toast) {
        if (this.container) {
            var instance = this.container.instance;
            instance.removeToast(toast);
        }
    };
    ToastsManager.prototype.clearAllToasts = function () {
        if (this.container) {
            var instance = this.container.instance;
            instance.removeAllToasts();
            this.dispose();
        }
    };
    ToastsManager.prototype.dispose = function () {
        if (this.container) {
            this.container.destroy();
            this.container = null;
        }
    };
    ToastsManager.prototype.error = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('error', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.prototype.info = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('info', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.prototype.success = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('success', message, title, data);
        return this.show(toast, options);
    };
    ToastsManager.prototype.warning = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('warning', message, title, data);
        return this.show(toast, options);
    };
    // allow user define custom background color and image
    ToastsManager.prototype.custom = function (message, title, options) {
        var data = options && options.data ? options.data : null;
        var toast = new toast_1.Toast('custom', message, title, data);
        return this.show(toast, options);
    };
    return ToastsManager;
}());
ToastsManager.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
ToastsManager.ctorParameters = function () { return [
    { type: core_1.ComponentFactoryResolver, },
    { type: core_1.NgZone, },
    { type: core_1.ApplicationRef, },
    { type: toast_options_1.ToastOptions, },
]; };
exports.ToastsManager = ToastsManager;
//# sourceMappingURL=toast-manager.js.map