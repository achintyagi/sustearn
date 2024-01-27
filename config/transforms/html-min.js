const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function (content) {
		// Prior to Eleventy 2.0: use this.outputPath instead
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: false,
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
			});
			return minified;
		}

		return content;
	});
};
