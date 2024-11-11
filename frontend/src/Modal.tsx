import { ModalContent } from "./components/settings/layout-elements";

export const Modal = ({
	children,
	modalRef,
}: {
	children: React.ReactNode;
	modalRef: React.RefObject<HTMLDivElement>;
}) => {
	return <ModalContent ref={modalRef}>{children}</ModalContent>;
};
