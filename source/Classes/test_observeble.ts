// noinspection JSDeprecatedSymbols

import {Observable} from "rxjs";

// Create observable that will publish a single value, 42
var observable = Observable.create((observer:any) => {
    observer.next(42);
    //set timout too 2 seconds
    setTimeout(() => {
        observer.next(43);
        observer.complete();
    }, 2000);
});

// Subscribe to begin publishing values
observable.subscribe((x:any) => {
    console.log(x);
});