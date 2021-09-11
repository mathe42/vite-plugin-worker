import { Plugin } from "vite";
import { bundle } from "vite-plugin-bundle";
import { isBuild } from "..";

const AUDIO_WORKLET_SCHEMA = "audioworklet:";
const AUDIO_WORKLET_HELPER = "audioworklet@helper";

const AUDIO_WORKLET_HELPER_CODE = `
  export default (url) => {
    return (ctx) => {
      if('audioWorklet' in ctx) {
        ctx.audioWorklet.addModule(url)
      }
    }
  }
`;

export function audio(inline_worklet_audio: boolean): Plugin {
  return {
    name: "worker:audioworklet",
    async resolveId(id, importer) {
      if (id === AUDIO_WORKLET_HELPER) return;
      if (!id.startsWith(AUDIO_WORKLET_SCHEMA)) return;

      const realID = await this.resolve(
        id.slice(AUDIO_WORKLET_SCHEMA.length),
        importer
      );

      if (!realID) throw new Error(`Audio Worklet file ${id} not found!`);

      return AUDIO_WORKLET_SCHEMA + realID.id;
    },
    load(id) {
      if (id === AUDIO_WORKLET_HELPER) return AUDIO_WORKLET_HELPER_CODE;
      if (!id.startsWith(AUDIO_WORKLET_SCHEMA)) return;

      const url = bundle(
        this,
        id.slice(AUDIO_WORKLET_SCHEMA.length),
        "worklet@audio",
        "iife",
        inline_worklet_audio,
        !isBuild
      );

      return `
        import AUDIO_HELPER from '${AUDIO_WORKLET_HELPER}'

        export default AUDIO_HELPER(${url})
      `;
    },
  };
}
