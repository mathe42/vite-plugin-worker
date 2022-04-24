import { Plugin } from "vite";
import { bundle } from "vite-plugin-bundle";
import { isBuild } from "..";

const LAYOUT_WORKLET_SCHEMA = "layoutworklet:";
const LAYOUT_WORKLET_HELPER = "layoutworklet@helper";

const LAYOUT_WORKLET_HELPER_CODE = `
  export default (url) => {
    if('layoutWorklet' in CSS) {
      CSS.layoutWorklet.addModule(url)
    }
  }
`;

export function layout(inline_worklet_layout: boolean): Plugin {
  return {
    name: "worker:layoutworklet",
    async resolveId(id, importer) {
      if (id === LAYOUT_WORKLET_HELPER) return;
      if (!id.startsWith(LAYOUT_WORKLET_SCHEMA)) return;

      const realID = await this.resolve(
        id.slice(LAYOUT_WORKLET_SCHEMA.length),
        importer
      );

      if (!realID) throw new Error(`Layout Worklet file ${id} not found!`);

      return LAYOUT_WORKLET_SCHEMA + realID.id;
    },
    async load(id) {
      if (id === LAYOUT_WORKLET_HELPER) return LAYOUT_WORKLET_HELPER_CODE;
      if (!id.startsWith(LAYOUT_WORKLET_SCHEMA)) return;

      const url = await bundle(
        this,
        id.slice(LAYOUT_WORKLET_SCHEMA.length),
        "worklet@layout",
        "iife",
        inline_worklet_layout,
        !isBuild
      );

      return `
        import LAYOUT_HELPER from '${LAYOUT_WORKLET_HELPER}'

        LAYOUT_HELPER(${url})
      `;
    },
  };
}
