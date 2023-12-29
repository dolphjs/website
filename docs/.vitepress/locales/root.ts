export const root = {
  lang: "en",
  label: "English",
  title: "dolph.js",
  description:
    "dolphjs is a nodejs backend framework built to ease development time and shorten code while retaining simplicity.",
  themeConfig: {
    lastUpdatedText: "Last updated",
    outline: {
      label: "On this page",
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    editLink: {
      pattern: "https://github.com/dolphjs/website/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2023-${new Date().getFullYear()} Utee & contributors`,
    },
    nav: [
      {
        text: "Guide",
        link: "/guide/",
        activeMatch: "/guide/",
      },
      {
        text: "Languages",
        activeMatch: "/languages/",
        items: [
          {
            text: "Typescript",
            link: "/frameworks/ts/",
            activeMatch: "/frameworks/ts/",
          },
          {
            text: "Javascript",
            link: "/frameworks/js/",
            activeMatch: "/frameworks/js/",
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
                text: `v1.0.6 (Current)`,
                activeMatch: "/",
                link: "/",
              },
            ],
          },
        ],
      },
    ],
    sidebar: [
      {
        text: "Guide",
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
            text: "CLI",
            link: "/cli/",
          },
        ],
      },
    ],
  },
};
