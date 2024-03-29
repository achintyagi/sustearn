/**
 * I strive to keep the `.eleventy.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `./config/collections/index.js`
 *  - `./config/filters/index.js`
 *  - `./config/plugins/index.js`
 *  - `./config/shortcodes/index.js`
 *  - `./config/transforms/index.js`
 */

const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const lucideIcons = require("@grimlink/eleventy-plugin-lucide-icons");
const pluginTOC = require("eleventy-plugin-nesting-toc");

// Importing from config
const getPages = require("./config/collections/pages.js");
const md = require("./config/filters/md.js");
const { readableDate, htmlDate } = require("./config/filters/date.js");
const addNbsp = require("./config/filters/add-nbsp.js");
const excerpt = require("./config/filters/excerpt.js");
const getAllTags = require("./config/filters/getAllTags.js");
const filterTagList = require("./config/filters/filterTagList.js");
const excludeTag = require("./config/filters/excludeTag.js");
const markdown = require("./config/plugins/md.js");
const assetHash = require("./config/plugins/asset-hash.js");
const drafts = require("./config/plugins/drafts.js");
const pluginImages = require("./config/plugins/images.js");
const htmlmin = require("./config/transforms/html-min.js");
const lightningCSS = require("./config/template-languages/css-config.js");
const esbuild = require("./config/template-languages/js-config.js");
const year = require("./config/shortcodes/year.js");

module.exports = function (eleventyConfig) {
	//Add Collections
	eleventyConfig.addCollection("pages", getPages);

	//Add Filters
	eleventyConfig.addFilter("md", md);
	eleventyConfig.addFilter("htmlDate", htmlDate);
	eleventyConfig.addFilter("readableDate", readableDate);
	eleventyConfig.addFilter("addNbsp", addNbsp);
	eleventyConfig.addFilter("excerpt", excerpt);
	eleventyConfig.addFilter("getAllTags", getAllTags);
	eleventyConfig.addFilter("filterTagList", filterTagList);
	eleventyConfig.addFilter("excludeTag", excludeTag);

	//Add Plugins
	eleventyConfig.addPlugin(markdown);
	eleventyConfig.addPlugin(assetHash);
	eleventyConfig.addPlugin(directoryOutputPlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(htmlmin);
	eleventyConfig.addPlugin(drafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginTOC, { tags: ["h2", "h3"] });
	eleventyConfig.addPlugin(lucideIcons, {
		class: "icon",
		width: "1em",
		height: "1em",
		stroke: "currentColor",
		"stroke-width": 2,
		"aria-hidden": "true",
	});

	//Add Shortcodes
	eleventyConfig.addShortcode("year", year);

	//Custom Template Languages
	eleventyConfig.addPlugin(lightningCSS);
	eleventyConfig.addPlugin(esbuild);

	//Passthrough copy
	eleventyConfig.addPassthroughCopy("./src/assets/images");
	eleventyConfig.addPassthroughCopy("./src/assets/fonts");
	eleventyConfig.addPassthroughCopy({ "./src/assets/favicons": "/" });

	eleventyConfig.setServerOptions({
		showAllHosts: true,
	});
	eleventyConfig.setQuietMode(true);

	return {
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "public",
		},
	};
};
