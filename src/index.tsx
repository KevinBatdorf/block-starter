import { type BlockConfiguration, registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json" with { type: "json" };
import { Editor } from "./editor/Editor.tsx";
import { icon } from "./editor/icon.tsx";
import { BlockOutput } from "./front/BlockOutput.tsx";

export type Attributes = {
	content: string;
};

registerBlockType(metadata as BlockConfiguration<Attributes>, {
	icon,
	category: "media",
	edit: ({ attributes, setAttributes }) => (
		<Editor attributes={attributes} setAttributes={setAttributes} />
	),
	save: ({ attributes }) => <BlockOutput attributes={attributes} />,
	example: {
		attributes: {},
	},
});
