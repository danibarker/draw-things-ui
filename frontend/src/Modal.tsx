import { ModalContent } from "./components/shared/layout-elements";

export const Modal = ({
	children,
	modalRef,
	$color1,
	$color2,
}: {
	children: React.ReactNode;
	modalRef: React.RefObject<HTMLDivElement>;
	$color1: string;
	$color2: string;
}) => {
	return (
		<ModalContent ref={modalRef} $color1={$color1} $color2={$color2}>
			{children}
		</ModalContent>
	);
};
