function Loading() {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontSize: "2rem",
				color: "white",
			}}
		>
			<h1>Loading...</h1>
		</div>
	);
}

export default Loading;
