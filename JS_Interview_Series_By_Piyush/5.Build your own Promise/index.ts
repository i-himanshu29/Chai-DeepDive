type TPromiseResolve<T> = (value:T) => void;
type TPromiseReject<T> = (reason:T) => void;

type TPromiseExecutor<T,K> = (
    resolve:TPromiseResolve<T>,
    reject:TPromiseReject<K>
) => void

type TPromiseThenCallback<T> = (value:T | undefined) => void
type TPromiseCatchCallback<T> = (reason:T | undefined) => void
type TPromiseFinallyCallback<T> = (reason:T | undefined) => void

enum PromiseState {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

class MyPromise<T ,K> {
    private _state: PromiseState = PromiseState.PENDING;
    private _successCallbackHandlers : TPromiseThenCallback<T>[]=[];
    private _failureCallbackHandlers : TPromiseCatchCallback<K>[]=[];
    private _finaalyCallbackHandlers : TPromiseFinallyCallback<K>[]=[];
    private _value:T | undefined = undefined
    private _reason:K | undefined = undefined
    constructor(executor: TPromiseExecutor<T,K>){
        executor(this._promiseResolver.bind(this),
        this._promiseRejector.bind(this));
    }

    public then(handlerFn:TPromiseThenCallback<T>){
        if(this._state === PromiseState.FULFILLED){
            handlerFn(this._value);
        }else{
            this._successCallbackHandlers.push(handlerFn);
        }
        // this._successCallbackHandlers.push(handlerFn)
        return this;
    }
    public catch(handlerFn:TPromiseCatchCallback<K>){
        if(this._state === PromiseState.REJECTED){
            handlerFn(this._reason)
        }else{
            this._failureCallbackHandlers.push(handlerFn)
        }
      
        return this;
    }

    public finally(handlerFn : TPromiseFinallyCallback){
        if(this._state !== PromiseState.PENDING) return handlerFn()
        this._finallyCallbackHandler = handlerFn
    }

    private _promiseResolver(value:T){
        if(this._state === PromiseState.FULFILLED) return 
        this._state = PromiseState.FULFILLED;
        this._successCallbackHandlers.forEach(cb=>cb(value));
    }
    private _promiseRejector(reason:K){
        if(this._state === PromiseState.REJECTED) return 
        this._state = PromiseState.REJECTED;
        this._reason =reason
        this._failureCallbackHandlers.forEach(cb=>cb(reason));
    }
}

// function customPromise () {
//     return new MyPromise<number,string>((resolve,reject)=>{
//         //...
//         resolve(1)
//     });
// }

function customPromise(){
    return new MyPromise<string,string>((res)=>{
        res('OK');
    });
}

customPromise().then(()=>console.log('Custom Promise DONE'));

const waitFor = (s:number)=>new MyPromise<number,number>((res,rej)=>{
    setTimeout(()=>res(s),s*1000)
})
waitFor(5)
// const p1 = customPromise()
    .then((value)=>{
        console.log(`Promise Resolve`,value)
    })
    // .then(()=>{})
    .catch((reason)=>{
        console.log('Reject',reason)
    })
    // .finally(()=>{
    //     console.log('All Good')
    // });

//    p1 .then(()=>{})