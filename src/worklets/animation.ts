import { Plugin } from "vite";
import { bundle } from "vite-plugin-bundle";
import { isBuild } from "..";

const ANIMATION_WORKLET_SCHEMA = "animationworklet:";
const ANIMATION_WORKLET_HELPER = "animationworklet@helper";

const ANIMATION_WORKLET_HELPER_CODE = `
  export default (url) => {
    if('animationWorklet' in CSS) {
      CSS.animationWorklet.addModule(url)
    }
  }
`;

export function animation(inline_worklet_animation: boolean): Plugin {
  return {
    name: "worker:animationworklet",
    async resolveId(id, importer) {
      if (id === ANIMATION_WORKLET_HELPER) return;
      if (!id.startsWith(ANIMATION_WORKLET_SCHEMA)) return;

      const realID = await this.resolve(
        id.slice(ANIMATION_WORKLET_SCHEMA.length),
        importer
      );

      if (!realID) throw new Error(`Paint Worklet file ${id} not found!`);

      return ANIMATION_WORKLET_SCHEMA + realID.id;
    },
    load(id) {
      if (id === ANIMATION_WORKLET_HELPER) return ANIMATION_WORKLET_HELPER_CODE;
      if (!id.startsWith(ANIMATION_WORKLET_SCHEMA)) return;

      const url = bundle(
        this,
        id.slice(ANIMATION_WORKLET_SCHEMA.length),
        "worklet@animation",
        "iife",
        inline_worklet_animation,
        !isBuild
      );

      return `
        import ANIMATION_HELPER from '${ANIMATION_WORKLET_HELPER}'

        ANIMATION_HELPER(${url})
      `;
    },
  };
}
