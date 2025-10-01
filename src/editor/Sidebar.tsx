import { InspectorControls } from "@wordpress/block-editor";
import { BaseControl, Button, PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import type { Attributes } from "../index.tsx";

type Props = {
	attributes: Attributes;
	setAttributes: (attributes: Partial<Attributes>) => void;
};

export const Sidebar = ({ attributes, setAttributes }: Props) => {
	return (
		<InspectorControls>
			<div className="block-starter-editor">
				<PanelBody title={__("Settings", "block-starter")}>
					<BaseControl>
						<div>Coming soon</div>
						<p className="my-5">{attributes.content}</p>
						<Button
							variant="primary"
							onClick={() => {
								setAttributes({ content: `Updated: ${Math.random()}` });
							}}
						>
							{__("Click me", "block-starter")}
						</Button>
					</BaseControl>
				</PanelBody>
			</div>
		</InspectorControls>
	);
};
