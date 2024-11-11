const WindowMinimize = ({
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
			d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l448 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416z"
		/>
	</svg>
);

export default WindowMinimize;