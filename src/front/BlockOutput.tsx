import { useBlockProps as blockProps, RichText } from "@wordpress/block-editor";
import "./style.css";
import { __ } from "@wordpress/i18n";

type BlockOutputProps = {
	attributes: { content: string };
};
export const BlockOutput = ({ attributes }: BlockOutputProps) => {
	return (
		<div
			{...blockProps.save({
				style: {
					"--foo": 100,
					"--bar": __("Hello world", "block-starter"),
				},
			})}
		>
			<div className="font-bold text-3xl mb-4">
				<RichText.Content value={attributes.content} />
			</div>
		</div>
	);
};
