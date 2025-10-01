import { InspectorControls } from "@wordpress/block-editor";
import { BaseControl, PanelBody } from "@wordpress/components";
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
						<div className="mt-5">Coming soon</div>
					</BaseControl>
				</PanelBody>
			</div>
		</InspectorControls>
	);
};
