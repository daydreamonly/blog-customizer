import { ArrowButton } from 'src/ui/arrow-button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useCloseHandler } from './hooks/useCloseHandler';

type TArticleParamsFormProps = {
	setArticleCurrentState: React.Dispatch<
		React.SetStateAction<ArticleStateType>
	>;
};

export const ArticleParamsForm = ({
	setArticleCurrentState,
}: TArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [articleFormState, setArticleFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLElement>(null);

	const sidebarOpenHandler = () => {
		setIsSidebarOpen((prev) => !prev);
	};
	useCloseHandler({ isSidebarOpen, sidebarOpenHandler, sidebarRef });

	const formStateHandler = (key: keyof ArticleStateType, value: OptionType) => {
		setArticleFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const clearHandler = () => {
		setArticleFormState(defaultArticleState);
		setArticleCurrentState(defaultArticleState);
	};

	const confirmHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleCurrentState(articleFormState);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={sidebarOpenHandler} />
			<aside
				ref={sidebarRef}
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={confirmHandler}
					onReset={clearHandler}>
					<Text
						size={31}
						weight={800}
						uppercase={true}
						family='open-sans'
						as={'h2'}>
						Задайте параметры
					</Text>
					<Select
						selected={articleFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => formStateHandler('fontFamilyOption', value)}
						title='шрифт'
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={articleFormState.fontSizeOption}
						title='размер шрифта'
						onChange={(value) => formStateHandler('fontSizeOption', value)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleFormState.fontColor}
						onChange={(value) => formStateHandler('fontColor', value)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleFormState.backgroundColor}
						onChange={(value) => formStateHandler('backgroundColor', value)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleFormState.contentWidth}
						onChange={(value) => formStateHandler('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
