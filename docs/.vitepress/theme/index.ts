import "./styles/index.css";
import { h, App } from "vue";
import theme from "vitepress/theme";
import { VPTheme } from "@vue/theme";
//@ts-expect-error
import PreferenceSwitch from "./components/PreferenceSwitch.vue";
import {
  preferSpring,
  preferExpress,
  filterHeadersByPreference,
} from "./components/preferences";

// import "./vars.css";

// export default {
//   ...theme,
// };

export default Object.assign({}, VPTheme, {
  Layout: () => {
    //@ts-ignore
    return h(VPTheme.Layout, null, {
      "sidebar-top": () => h(PreferenceSwitch),
    });
  },
  enhanceApp({ app }: { app: App }) {
    app.provide("prefer-spring", preferSpring);
    app.provide("prefer-express", preferExpress);
    app.provide("filter-headers", filterHeadersByPreference);
  },
});
