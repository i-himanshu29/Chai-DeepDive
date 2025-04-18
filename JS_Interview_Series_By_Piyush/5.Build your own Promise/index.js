var PromiseState;
(function (PromiseState) {
    PromiseState["PENDING"] = "pending";
    PromiseState["FULFILLED"] = "fulfilled";
    PromiseState["REJECTED"] = "rejected";
})(PromiseState || (PromiseState = {}));
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        this._state = PromiseState.PENDING;
        this._successCallbackHandlers = [];
        this._failureCallbackHandlers = [];
        executor(this._promiseResolver, this._promiseRejector);
    }
    MyPromise.prototype.then = function (handlerFn) {
        this._successCallbackHandlers.push(handlerFn);
        return this;
    };
    MyPromise.prototype.catch = function (handlerFn) {
        this._failureCallbackHandlers.push(handlerFn);
        return this;
    };
    MyPromise.prototype._promiseResolver = function (value) {
        if (this._state === PromiseState.FULFILLED)
            return;
        this._state = PromiseState.FULFILLED;
        this._successCallbackHandlers.forEach(function (cb) { return cb(value); });
    };
    MyPromise.prototype._promiseRejector = function (reason) {
        if (this._state === PromiseState.REJECTED)
            return;
        this._state = PromiseState.REJECTED;
        this._failureCallbackHandlers.forEach(function (cb) { return cb(reason); });
    };
    return MyPromise;
}());
function customPromise() {
    return new MyPromise(function (resolve, reject) {
        //...
        resolve(1);
    });
}
var waitFor = function (s) { return new MyPromise(function (res, rej) {
    setTimeout(function () { return res(s); }, s * 1000);
}); };
waitFor(5)
    // const p1 = customPromise()
    .then(function (value) {
    console.log("Promise Resolve", value);
})
    // .then(()=>{})
    .catch(function (reason) {
    console.log('Reject', reason);
});
// .finally(()=>{
//     console.log('All Good')
// });
//    p1 .then(()=>{})
