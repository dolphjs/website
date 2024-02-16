import { defineConfig } from "vitepress";
import { algolia } from "./locales/algolia";
import { root } from "./locales/root";
import Container from "markdown-it-container";
import fs from "fs";
import path from "path";

const codeRE = /^code\s+(.*)$/;

export const nav = [
  {
    text: "Guide",
    link: "/guide/",
  },
  {
    text: "Languages",
    items: [
      {
        text: "Typescript",
        link: "frameworks/ts/",
      },
      {
        text: "Javascript",
        link: "frameworks/js/",
      },
    ],
  },
  {
    text: `v1.0.6`,
    items: [
      {
        items: [
          {
            text: "Release Notes",
            link: "https://github.com/dolphjs/dolph/releases",
          },
        ],
      },
      {
        text: "Versions",
        items: [
          {
            text: `v1.1.0 (Current)`,
            activeMatch: "/",
            link: "/",
          },
        ],
      },
    ],
  },
];

export const sidebar = {
  "/guide/": [
    {
      text: "Guide",
      collapsed: false,
      items: [
        {
          text: "Why use dolphjs?",
          link: "/guide/why",
        },
        {
          text: "Getting Started",
          link: "/guide/",
        },
        {
          text: "Configuration",
          link: "/guide/config",
        },
      ],
    },
    {
      text: "Overview",
      collapsed: false,
      items: [
        {
          text: "Project structure",
          link: "/project-structure/",
        },
        {
          text: "Routers",
          link: "/routers/",
          // items: [
          //   {
          //     text: "Typescript",
          //     link: "/frameworks/ts/",
          //   },
          //   {
          //     text: "Javascript",
          //     link: "/frameworks/js/",
          //   },
          // ],
        },
        {
          text: "Controllers",
          link: "/controllers/",
        },
        {
          text: "Services",
          link: "/services/",
        },
        {
          text: "Models",
          link: "/models/",
        },
        {
          text: "Middlewares",
          link: "/middlewares/",
        },
        {
          text: "Decorators",
          link: "/decorators/",
        },
        {
          text: "Databases",
          link: "/databases/",
        },
        {
          text: "CLI",
          link: "/cli/",
        },
      ],
    },
    {
      text: "Security",
      collapsed: true,
      items: [
        {
          text: "Authentication",
          link: "/authentication/",
        },
        {
          text: "Authorization",
          link: "/authorization/",
        },
        {
          text: "Encrypting and Hashing",
          link: "/encryption/",
        },
      ],
    },
  ],
  "/approaches/": [
    {
      text: "General",
      items: [
        { text: "Setup", link: "/api/setup", collapsed: false },
        { text: "General", link: "/api/general", collapsed: true },
      ],
    },
    {
      text: "Spring Routing",
      items: [
        {
          text: "Controllers",
          link: "/api/spring/controllers",
          collapsed: true,
        },
        {
          text: "Components",
          link: "/api/spring/components",
          collapsed: true,
        },
      ],
    },
    {
      text: "Express Routing",
      items: [
        {
          text: "Controllers",
          link: "/api/express/controllers",
          collapsed: true,
        },
        { text: "Routers", link: "/api/express/routers", collapsed: true },
      ],
    },
  ],
  "/samples/": [
    {
      text: "Basic",
      items: [],
    },
  ],
  "/code-guide/": [
    {
      text: "Code guide",
      items: [{ text: "Clean Code", link: "/code-guide" }],
    },
  ],
};

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
    ["link", { rel: "icon", href: "/website/favicon.png" }],
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
    [
      "script",
      {},
      fs.readFileSync(
        path.resolve(__dirname, "./inlinedScripts/preference.js"),
        "utf-8"
      ),
    ],
    [
      "script",
      {
        src: "https://cdn.usefathom.com/script.js",
        "data-site": "XNOLWPLB",
        "data-spa": "auto",
        defer: "",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/icon.svg",
    nav,
    sidebar,
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
      searchParameters: {
        facetFilters: ["version:v3"],
      },
      locales: { ...algolia },
    },
  },
  locales: {
    root,
  },
  // outDir: "../dist",
  // srcDir: "../src",
});
