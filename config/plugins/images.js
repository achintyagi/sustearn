const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier");

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();

	return path.resolve(split.join(path.sep), relativeFilePath);
}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = function (eleventyConfig) {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode(
		"image",
		async function imageShortcode(src, alt, caption, sizes, loading) {
			let formats = ["avif", "webp", "auto", "jpeg"];
			let input;
			if (isFullUrl(src)) {
				input = src;
			} else {
				input = relativeToInputPath(this.page.inputPath, src);
			}

			let metadata = await eleventyImage(input, {
				widths: [480, 768, 1280, null],
				formats,
				urlPath: "/assets/images/scaled",
				outputDir: "public/assets/images/scaled",
			});

			// let imageAttributes = {
			// 	alt,
			// 	sizes,
			// 	loading: loading || "lazy",
			// 	decoding: "async",
			// };

			// return eleventyImage.generateHTML(metadata, imageAttributes);

			let lowsrc = metadata.jpeg[metadata.jpeg.length - 1];

			return htmlmin.minify(
				`
				<figure class="flow">
					<picture>
						${Object.values(metadata)
							.map((imageFormat) => {
								return `  <source type="${
									imageFormat[0].sourceType
								}" srcset="${imageFormat
									.map((entry) => entry.srcset)
									.join(", ")}" sizes="${sizes}">`;
							})
							.join("\n")}
							<img
								src="${lowsrc.url}"
								width="${lowsrc.width}"
								height="${lowsrc.height}"
								alt="${alt}"
								loading = "${loading || `lazy`}"
								decoding="async">
						</picture>
						${caption ? `<figcaption>${caption}</figcaption>` : ``}
				</figure>
				`,
				{ collapseWhitespace: true }
			);
		}
	);
};
