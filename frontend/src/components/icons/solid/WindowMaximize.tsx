const WindowMaximize = ({
	fill,
	stroke,
	strokeWidth,
}: {
	fill: string;
	stroke: string;
	strokeWidth: number;
}) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<path
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
		/>
	</svg>
);

export default WindowMaximize;