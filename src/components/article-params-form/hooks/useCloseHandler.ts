import { useEffect } from 'react';

type TUseCloseHandler = {
	isSidebarOpen: boolean;
	sidebarOpenHandler: () => void;
	sidebarRef: React.RefObject<HTMLElement>;
};

export const useCloseHandler = ({
	isSidebarOpen,
	sidebarOpenHandler,
	sidebarRef,
}: TUseCloseHandler) => {
	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !sidebarRef.current?.contains(target)) {
				sidebarOpenHandler();
			}
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				sidebarOpenHandler();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [isSidebarOpen, sidebarOpenHandler]);
};
