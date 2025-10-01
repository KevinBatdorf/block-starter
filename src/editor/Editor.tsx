import { useBlockProps as blockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import type { Attributes } from "../index.tsx";
import { Sidebar } from "./Sidebar.tsx";
import "./editor.css";

type Props = {
	attributes: Attributes;
	setAttributes: (attributes: Partial<Attributes>) => void;
};

export const Editor = ({ attributes, setAttributes }: Props) => {
	return (
		<>
			<Sidebar attributes={attributes} setAttributes={setAttributes} />
			<div {...blockProps()}>
				<div className="font-bold text-3xl mb-4">
					<RichText
						value={attributes.content}
						placeholder={__("Enter some text...", "block-starter")}
						onChange={(content) => setAttributes({ content })}
					/>
				</div>
			</div>
		</>
	);
};
