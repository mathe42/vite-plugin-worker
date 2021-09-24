# vite-plugin-worker

Use WebWorkers in Vite with full* support for all Browsers!

### Install

```sh
npm i --save-dev vite-plugin-worker # yarn add -D vite-plugin-worker
```

### Add it to vite.config.js

```ts
// vite.config.js
import worker, {bundleHelper} from 'vite-plugin-worker'

export default {
  plugins: [
    bundleHelper(),
    worker({
      // All options with default values
      inline_worklet_paint = false,
      inline_worklet_audio = false,
      inline_worklet_layout = false,
      inline_worklet_animation = false,
      service_worker_file = 'sw.js'
    })
  ],
}
```

The `bundleHelper` Plugin is used internaly and is important. But you should only add it once!

## Import worklets

To import a worklet just import it like this:
```ts
import 'animationworklet:./path/to/worklet'
import 'layoutworklet:./path/to/worklet'
import 'paintworklet:./path/to/worklet'
```

Note that if a worklet is not supported the import will ***fail silent***. The import is only used when the specific worklettype is supported.


```ts
import myAudioWorklet from 'audioworklet:./path/to/worklet'
myAudioWorlet(ctx)
```

Note that the audioworkelt exports a function that recives a `BaseAudioContext`. And note that calling the function also fails silent when the AudioWorklet is not supported.

### Inline
For each worklet type you can specify if the worklets should be inlined (as base64 strings). This will decreace the number of files but increase the overall size.

## Workers
### ServiceWorker
> When useing the ServiceWorker you propably want to specify the service_worker_file option.

You shoudld use NO MORE THAN 1 import of this type in your hole project! And only call this function ONCE per page load!

You use it like this:

```ts
import register from 'serviceworker:./path/to/sw'
register({
  scope: '/'
})
```

The options of the register function are the options you can pass to `navigator.serviceWorker.register` without the `type` filed.

### Worker
We have multiple options you can apply:
1. iife
2. module
3. inline
4. single

> Only use one of iife or module!

#### iife / module
The option module make the build uses module Workers.
The option iife make the development version bundle the worker into a single file.

#### Inline
Inline the Worker es base64 code.

#### Single
The export is directly a Worker instance imeadeately created.

#### How to use the options:

Use the correct import. If you dont want to use any options use `worker:`. Put all used options between worker and : seperated with `-`. For example:

`worker-module-single-inline:`. 


Then put the workerfile behind ist:


```ts
import createWorker from 'worker-iife:./path/to/worker'
const worker = new createWorker()

// Or
import worker from 'worker-iife-single:./path/to/worker'
console.log(worker)
```



### SharedWorker
Same as Worker but replace worker with sharedWorker in all places.


## Types
Ensure that the file `vite-plugin-worker/client.d.ts` is loaded. This supports full typings.


## Module Worker
Not all Browsers support module Workers (see https://caniuse.com/mdn-api_worker_worker_ecmascript_modules).

This results in some Drawbacks we can either compile the worker allways into a single file (iife) or use module Worker in development. As it is much faster we use module Worker as default (serviceWorker and worklets are allways compiled as iife).

In production the default is to use a single file. This is a litte bad for performance but has full browser support.

> The default behavior might change in future updates when FF & Safari support module workers.

## If you target only chromium based browsers
If you build a chromium only webpage for example for electron etc. You should import all workers with `worker-module:./myfile`. This is (should) result in the best posible performance! But you might want to use the inline option so you have less files.
