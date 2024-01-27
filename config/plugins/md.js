const path = require("path");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItFootnote);

		mdLib.renderer.rules.footnote_caption = (tokens, idx) => {
			let n = Number(tokens[idx].meta.id + 1).toString();

			if (tokens[idx].meta.subId > 0) {
				n += ":" + tokens[idx].meta.subId;
			}

			return n;
		};
		mdLib.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
			let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
			let caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
			let refid = id;

			if (tokens[idx].meta.subId > 0) {
				refid += ":" + tokens[idx].meta.subId;
			}

			return `
				<sup class="footnote-ref step--2">
					<a href="#fn${id}" id="fref${refid}" aria-label="Footnote ${caption}">[${caption}]</a></sup>
			`;
		};
		mdLib.renderer.rules.footnote_block_open = (tokens, idx, options) => {
			return (
				(options.xhtmlOut
					? '<hr class="footnotes-sep" />\n'
					: '<hr class="footnotes-sep">\n') +
				'<section class="footnotes flow">\n' +
				'<h2 id="footnotes-heading" class="heading-3">Footnotes</h2>' +
				'<ol class="flow" aria-labelledby="footnotes-heading">\n'
			);
		};
		mdLib.renderer.rules.footnote_open = (tokens, idx, options, env, slf) => {
			let n = Number(tokens[idx].meta.id + 1).toString();
			let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

			if (tokens[idx].meta.subId > 0) {
				n += ":" + tokens[idx].meta.subId;
				id += ":" + tokens[idx].meta.subId;
			}

			return `
				<li id="fn${id}" class="footnote-item">
			`;
		};

		mdLib.renderer.rules.footnote_close = () => {
			return `
			</li>
			`;
		};

		mdLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
			let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

			if (tokens[idx].meta.subId > 0) {
				id += ":" + tokens[idx].meta.subId;
			}

			/* ↩ with escape code to prevent display as Apple Emoji on iOS */
			return `
					<a 
						href="#fref${id}" 
						class="footnote-backref"
						aria-label="Backlink to footnote ${id}"
					>
						\u21a9\uFE0E
					</a>
				`;
		};
	});
};
