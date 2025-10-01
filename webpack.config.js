import tailwindcss from "@tailwindcss/postcss";
import config from "@wordpress/scripts/config/webpack.config.js";
import postcssPrefixSelector from "postcss-prefix-selector";

// Override PostCSS configuration
const loader = config.module.rules
	.find(({ test }) => test?.toString()?.includes("css"))
	.use.find(({ loader }) => loader?.includes("postcss-loader"));

const prefix = ".wp-block-kevinbatdorf-block-starter";
const editorPrefix = ".block-starter-editor";
loader.options.postcssOptions.plugins = [
	tailwindcss(),
	postcssPrefixSelector({
		prefix: prefix,
		transform(prefix, selector, prefixedSelector, filePath, rule) {
			if (/node_modules/.test(filePath)) return selector;

			// Scoped to either editor or frontend styles
			const editor = filePath.endsWith("editor.css");

			const pre = editor ? editorPrefix : prefix;
			if (/^(html|body|:root|:host)/.test(selector)) {
				return selector.replace(/^([^\s]*)/, `$1 ${pre}`);
			}
			const a = rule.prev();
			if (a?.type === "comment" && a.text.trim() === "no-prefix") {
				return selector;
			}

			// Swap out the prefix for editor or frontend
			return prefixedSelector.replaceAll(prefix, pre);
		},
	}),
];

export default config;
