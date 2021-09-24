import { Plugin } from "vite";
import { bundle } from "vite-plugin-bundle";
import { isBuild } from "..";

const SERVICE_WORKER_SCHEMA = "serviceworker:";

export function serviceWorker(filename: string): Plugin {
  return {
    name: "worker:serviceworker",
    async resolveId(id, importer) {
      if (!id.startsWith(SERVICE_WORKER_SCHEMA)) return;

      if (!importer) return id;

      const realID = await this.resolve(
        id.slice(SERVICE_WORKER_SCHEMA.length),
        importer
      );

      if (!realID) throw new Error(`Service Worker file ${id} not found!`);

      return SERVICE_WORKER_SCHEMA + realID.id;
    },
    load(id) {
      if (!id.startsWith(SERVICE_WORKER_SCHEMA)) return;

      const url = bundle(
        this,
        id.slice(SERVICE_WORKER_SCHEMA.length),
        "worker@service",
        "iife",
        false,
        !isBuild,
        filename
      );

      return `
        export default (opt = {}) => {
          if('serviceWorker' in navigator) {
            return navigator.serviceWorker.register(${url}, opt)
          }
        }
      `;
    },
  };
}
