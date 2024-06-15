import React from "react";

declare global {
	interface Window {
		confetti: any;
	}
}

interface ConfettiAnimationProps {
	fireAngle?: number;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
	fireAngle = 0,
}) => {
	const duration = 3 * 1000,
		animationEnd = Date.now() + duration;

	const randomInRange = (min: number, max: number) => {
		return Math.random() * (max - min) + min;
	};

	React.useEffect(() => {
		const interval: any = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 10 * (timeLeft / duration);

			// since particles fall down, start a bit higher than random
			window.confetti({
				angle: fireAngle,
				spread: randomInRange(0, 360),
				particleCount,
				shapes: ["images"],
				shapeOptions: {
					images: [
						{
							src: "/images/confetti_1.svg",
							replaceColor: true,
							width: 12.12,
							height: 7.36,
						},
						{
							src: "/images/confetti_2.svg",
							replaceColor: true,
							width: 7.08,
							height: 7.08,
						},
						{
							src: "/images/confetti_3.svg",
							replaceColor: true,
							width: 6.94,
							height: 6.94,
						},
					],
				},
				colors: ["#83BF6E", "#8F59FF", "#2B85FF", "#FF6A56"],
			});
		}, 250);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default ConfettiAnimation;
