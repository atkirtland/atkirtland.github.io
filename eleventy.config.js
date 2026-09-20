import { existsSync } from "node:fs";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";

const passthroughPaths = [
  "assets",
  "raw",
  "CNAME",
  ".nojekyll",
];

function dateToString(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function (eleventyConfig) {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItFootnote);

  eleventyConfig.setLibrary("md", markdown);

  // Jekyll treats an unquoted include name as a literal path
  // (`{% include head.html %}`); LiquidJS otherwise treats it as a variable.
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  for (const path of passthroughPaths) {
    if (existsSync(path)) {
      eleventyConfig.addPassthroughCopy(path);
    }
  }

  // Keep both names while the templates are being migrated from Jekyll.
  eleventyConfig.addFilter("dateToString", dateToString);
  eleventyConfig.addFilter("date_to_string", dateToString);

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("_posts/**/*.{md,markdown,html}").reverse(),
  );

  // Jekyll provided site.categories and site.tags automatically. Build
  // equivalent grouped collections for the migrated Liquid templates.
  for (const key of ["categories", "tags"]) {
    eleventyConfig.addCollection(key, (collectionApi) => {
      const groups = new Map();

      for (const post of collectionApi.getFilteredByGlob(
        "_posts/**/*.{md,markdown,html}",
      )) {
        const rawValues =
          key === "categories"
            ? [post.data.category, post.data.categories]
            : post.data[key];
        const values = (Array.isArray(rawValues) ? rawValues : [rawValues])
          .flat()
          .filter(Boolean);

        for (const value of values) {
          if (!groups.has(value)) {
            groups.set(value, []);
          }
          groups.get(value).push(post);
        }
      }

      return [...groups]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([name, posts]) => ({
          name,
          posts: posts.sort((left, right) => right.date - left.date),
        }));
    });
  }

  for (const name of ["papers", "projects", "microblog", "lists"]) {
    eleventyConfig.addCollection(name, (collectionApi) =>
      collectionApi
        .getFilteredByGlob(`_${name}/**/*.{md,markdown,html}`)
        .sort((left, right) => right.date - left.date),
    );
  }

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/blog/feed.xml",
    collection: {
      name: "posts",
      limit: 0,
    },
    metadata: {
      language: "en",
      title: "Aaron Kirtland",
      subtitle: "Posts by Aaron Kirtland",
      base: "https://kirt.land/",
      author: {
        name: "Aaron Kirtland",
      },
    },
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    // Nunjucks is required internally by the RSS plugin's virtual template.
    templateFormats: ["md", "markdown", "html", "liquid", "njk"],
  };
}
