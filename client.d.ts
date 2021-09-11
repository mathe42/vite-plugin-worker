/// <reference lib="dom" />

declare const sharedWorkerCtor: new () => SharedWorker;
declare const sharedWorkerSingle: SharedWorker;

declare const WorkerCtor: new () => Worker;
declare const WorkerSingle: Worker;

declare module "sharedWorker:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-inline:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-module:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-module-inline:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-inline-module:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-iife:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-iife-inline:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-inline-iife:*" {
  export default sharedWorkerCtor;
}

declare module "sharedWorker-single:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-single-inline:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-inline-single:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-single-iife:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-iife-single:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-iife-single-inline:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-iife-inline-single:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-inline-iife-single:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-single-iife-inline:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-single-inline-iife:*" {
  export default sharedWorkerSingle;
}

declare module "sharedWorker-inline-single-iife:*" {
  export default sharedWorkerSingle;
}

declare module "worker:*" {
  export default WorkerCtor;
}

declare module "worker-inline:*" {
  export default WorkerCtor;
}

declare module "worker-module:*" {
  export default WorkerCtor;
}

declare module "worker-module-inline:*" {
  export default WorkerCtor;
}

declare module "worker-inline-module:*" {
  export default WorkerCtor;
}

declare module "worker-iife:*" {
  export default WorkerCtor;
}

declare module "worker-iife-inline:*" {
  export default WorkerCtor;
}

declare module "worker-inline-iife:*" {
  export default WorkerCtor;
}

declare module "worker-single:*" {
  export default WorkerSingle;
}

declare module "worker-single-inline:*" {
  export default WorkerSingle;
}

declare module "worker-inline-single:*" {
  export default WorkerSingle;
}

declare module "worker-single-iife:*" {
  export default WorkerSingle;
}

declare module "worker-iife-single:*" {
  export default WorkerSingle;
}

declare module "worker-iife-single-inline:*" {
  export default WorkerSingle;
}

declare module "worker-iife-inline-single:*" {
  export default WorkerSingle;
}

declare module "worker-inline-iife-single:*" {
  export default WorkerSingle;
}

declare module "worker-single-iife-inline:*" {
  export default WorkerSingle;
}

declare module "worker-single-inline-iife:*" {
  export default WorkerSingle;
}

declare module "worker-inline-single-iife:*" {
  export default WorkerSingle;
}

declare const SWorker: (
  config: Omit<RegistrationOptions, "type">
) => Promise<ServiceWorkerRegistration>;


declare module "serviceworker:*" {
  export default SWorker;
}

declare module "paintworklet:*" {}
declare module "layoutworklet:*" {}
declare module "animationworklet:*" {}
declare module "audioworklet:*" {
  const worklet: (ctx: BaseAudioContext) => void
  export default worklet
}
