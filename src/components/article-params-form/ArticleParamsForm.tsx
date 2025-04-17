import { ArrowButton } from 'src/ui/arrow-button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';

export type TArticleParamsFormChildren = {
	formTitle: ReactNode;
	fontSelector: ReactNode;
	fontSizeSelector: ReactNode;
	fontColorSelector: ReactNode;
	separator: ReactNode;
	backgroundColor: ReactNode;
	widthContent: ReactNode;
	resetButton: ReactNode;
	confirmButton: ReactNode;
};

export type TArticleParamsForm = {
	isOpen: boolean;
	onClick: () => void;
	children: TArticleParamsFormChildren;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const { isOpen, onClick } = props;
	const {
		formTitle,
		fontSelector,
		fontSizeSelector,
		fontColorSelector,
		separator,
		backgroundColor,
		widthContent,
		resetButton,
		confirmButton,
	} = props.children;
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !asideRef.current?.contains(target)) {
				onClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClick]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					{formTitle}
					{fontSelector}
					{fontSizeSelector}
					{fontColorSelector}
					{separator}
					{backgroundColor}
					{widthContent}
					<div className={styles.bottomContainer}>
						{resetButton}
						{confirmButton}
					</div>
				</form>
			</aside>
		</>
	);
};
