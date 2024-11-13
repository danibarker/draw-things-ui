import { useEffect, useState } from "react";

const Timer = ({ time }: { time: number }) => {
	const [timeRemaining, setTimeRemaining] = useState(time);

	useEffect(() => {
		if (timeRemaining === 0) {
			return;
		}

		const intervalId = setInterval(() => {
			setTimeRemaining((time: number) => time - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeRemaining]);

	return (
		<div>
			<p>Time Remaining: {timeRemaining}</p>
			<button onClick={() => setTimeRemaining(60)}>Start Timer</button>
		</div>
	);
};

export default Timer;
