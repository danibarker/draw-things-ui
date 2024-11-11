interface Props {
	fill?: string;
	stroke?: string;
	width?: number;
}

const Loading = (props: Props) => {
	return (
		<div style={{ width: props.width + "px", height: props.width + "px" }}>
			<svg viewBox="0 0 60 60">
				<defs></defs>
				<path
					d="M30 10 
            A 20 20 10 1 0 50 30"
					stroke={props.stroke || "#000"}
					strokeWidth="2"
					fill="none"
				/>
				<path
					d="M 50 30 L 45 32 55 28 Q 47 23 55 28 45 32 45 32 47 23 47 23 55 28 55 28"
					fill={props.fill || "none"}
					stroke={props.stroke || "#000"}
					strokeWidth="2"
				/>
			</svg>
		</div>
	);
};

export default Loading;
