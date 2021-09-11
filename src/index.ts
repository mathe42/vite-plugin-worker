import { Plugin } from "vite";
import { audio } from "./worklets/audio";
import { paint } from "./worklets/paint";
import { layout } from "./worklets/layout";
import { animation } from "./worklets/animation";
import { serviceWorker } from "./worker/serviceWorker";
import { worker } from "./worker/worker";
import { sharedWorker } from "./worker/sharedWorker";

export interface PluginOption {
  inline_worklet_paint?: boolean;
  inline_worklet_audio?: boolean;
  inline_worklet_layout?: boolean;
  inline_worklet_animation?: boolean;
  service_worker_file?: string
}

export let isBuild: boolean;

export default function betterWorker({
  inline_worklet_paint = false,
  inline_worklet_audio = false,
  inline_worklet_layout = false,
  inline_worklet_animation = false,
  service_worker_file = 'sw.js'
}: PluginOption): Plugin[] {
  return [
    {
      name: "worker:base",
      configResolved(config) {
        isBuild = config.command === "build";
      },
    },
    paint(inline_worklet_paint),
    audio(inline_worklet_audio),
    layout(inline_worklet_layout),
    animation(inline_worklet_animation),
    serviceWorker(service_worker_file),
    worker(),
    sharedWorker()
  ];
}
