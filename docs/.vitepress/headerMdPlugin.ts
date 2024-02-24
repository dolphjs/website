/**
 * A markdown-it plugin to support custom header metadata
 * Headers that end with * are express routing only
 * Headers that end with ** are spring routing only
 * This plugin strips the markers and augments the extracted header data,
 * which can be then used by the theme to filter headers.
 *
 * TODO: we will likely also need special syntax for preserving the same anchor
 * links across translations similar to the one at
 * https://github.com/vitejs/docs-cn/tree/main/.vitepress/markdown-it-custom-anchor
 */

import MarkdownIt from "markdown-it";
import { Header } from "vitepress";

export interface AugmentedHeader extends Header {
  springOnly?: boolean;
  expressOnly?: boolean;
}

export const headerPlugin = (md: MarkdownIt) => {
  md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
    for (const child of tokens[i + 1].children!) {
      if (child.type === "text" && child.content.endsWith("*")) {
        child.content = child.content.replace(/\s*\*+$/, "");
      }
    }
    return self.renderToken(tokens, i, options);
  };

  const render = md.render;
  md.render = (content, env) => {
    const res = render(content, env);

    if (env && env.headers) {
      processHeaders(env.headers);
    }

    return res;
  };
};

function processHeaders(headers: AugmentedHeader[]) {
  for (const h of headers) {
    if (h.title.endsWith("*")) {
      if (h.title.endsWith("**")) {
        h.springOnly = true;
      } else {
        h.expressOnly = true;
      }
      h.title = h.title.replace(/\s*\*+$/, "");
    }
    if (h.children) {
      processHeaders(h.children);
    }
  }
}
