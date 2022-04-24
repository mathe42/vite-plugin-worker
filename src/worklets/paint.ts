import { Plugin } from "vite";
import { bundle } from "vite-plugin-bundle";
import { isBuild } from "..";

const PAINT_WORKLET_SCHEMA = "paintworklet:";
const PAINT_WORKLET_HELPER = "paintworklet@helper";

const PAINT_WORKLET_HELPER_CODE = `
  export default (url) => {
    if('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule(url)
    }
  }
`;

export function paint(inline_worklet_paint: boolean): Plugin {
  return {
    name: "worker:paintworklet",
    async resolveId(id, importer) {
      if (id === PAINT_WORKLET_HELPER) return;
      if (!id.startsWith(PAINT_WORKLET_SCHEMA)) return;

      const realID = await this.resolve(
        id.slice(PAINT_WORKLET_SCHEMA.length),
        importer
      );

      if (!realID) throw new Error(`Paint Worklet file ${id} not found!`);

      return PAINT_WORKLET_SCHEMA + realID.id;
    },
    async load(id) {
      if (id === PAINT_WORKLET_HELPER) return PAINT_WORKLET_HELPER_CODE;
      if (!id.startsWith(PAINT_WORKLET_SCHEMA)) return;

      const url = await bundle(
        this,
        id.slice(PAINT_WORKLET_SCHEMA.length),
        "worklet@paint",
        "iife",
        inline_worklet_paint,
        !isBuild
      );

      return `
        import PAINT_HELPER from '${PAINT_WORKLET_HELPER}'

        PAINT_HELPER(${url})
      `;
    },
  };
}
