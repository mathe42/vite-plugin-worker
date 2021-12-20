import { Plugin } from "vite";
import { bundle } from "vite-plugin-bundle";
import { isBuild } from "..";

const validSettings = [
  'iife',
  'module',
  'inline',
  'single'
]

const WORKER_SCHEMA = "worker";

export function worker(): Plugin {
  return {
    name: "worker:worker",
    async resolveId(id, importer) {
      const [p1, ...rest] = id.split(':')
      if(!p1.startsWith(WORKER_SCHEMA)) return

      if(!importer) return id;

      const realID = await this.resolve(rest.join(":"), importer);

      if (!realID) throw new Error(`Worker file ${id} not found!`);

      return p1 + ':' + realID.id;
    },
    async load(id) {
      const [p1, ...rest] = id.split(":");

      if (!p1.startsWith(WORKER_SCHEMA)) return;

      const settings = p1.split("-").slice(1);

      if(settings.some((val) => !validSettings.includes(val))) return

      if(settings.includes('iife') && settings.includes('module')) throw new Error('You can not have both "module" and "iife" settings in a Worker File!')

      const realID = rest.join(':')

      const buildType = isBuild ? (settings.includes('module') ? 'module' : 'iife') : (settings.includes('iife') ? 'iife' : 'module')


      const file = await bundle(this, realID, 'worker', buildType, isBuild && settings.includes('inline'), !isBuild)

      if(!settings.includes('single')) {
        return `
          export default function workerWrapper() {
            return new Worker(${file}, ${JSON.stringify({
              type: buildType === 'iife' ? 'classic' : 'module'
            })})
          }
        `
      } else {
        return `
          let myWorker = new Worker(${file}, ${JSON.stringify({
          type: buildType === "iife" ? "classic" : "module",
        })})
          export default myWorker
        `;
      }
    },
  };
}
