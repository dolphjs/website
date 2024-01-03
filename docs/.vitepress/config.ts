import { defineConfig } from "vitepress";
import { algolia } from "./locales/algolia";
import { root } from "./locales/root";
import Container from "markdown-it-container";

const codeRE = /^code\s+(.*)$/;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en",
  title: "dolph",
  titleTemplate: "dolphjs",
  base: "/website/",
  description:
    "dolphjs is a nodejs backend framework built to ease development time and shorten code while retaining simplicity.",
  markdown: {
    // theme: {
    //   light: "css-variables",
    //   dark: "css-variables",
    // },
    config: (md) => {
      md.use(Container, "code", {
        validate: (params) => params.trim().match(codeRE),
        render: (tokens, idx) => {
          const m = tokens[idx].info.trim().match(codeRE);
          if (tokens[idx].nesting === 1)
            return `<div><div class="code-file">${m[1]}</div>`;
          else return "</div>\n";
        },
      });
    },
  },
  head: [
    ["link", { rel: "icon", href: "/website/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/dolphjs.svg",
    // nav: [
    //   { text: "Home", link: "/" },
    //   { text: "Examples", link: "/markdown-examples" },
    // ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [{ icon: "github", link: "https://github.com/dolphjs/dolph" }],
    algolia: {
      appId: "MY12T9HC2R",
      apiKey: "2fcb3bd54eef2a4852e0a15286cc5bf7",
      indexName: "dolphjs",
      locales: algolia,
    },
  },
  locales: {
    root,
  },
  // outDir: "../dist",
  // srcDir: "../src",
});
