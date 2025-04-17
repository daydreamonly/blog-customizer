import { createRoot } from 'react-dom/client';
import React, { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { RadioGroup } from './ui/radio-group';
import { Text } from './ui/text';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [tempState, setTempState] = useState(defaultArticleState);

	const isOpenHandler = () => {
		setIsOpen((prev) => !prev);
	};

	const clearHandler = () => {
		setArticleState(defaultArticleState);
		setTempState(defaultArticleState);
	};

	const confirmHandler = () => {
		setArticleState(tempState);
	};

	const handleTempChange = (key: keyof typeof tempState, value: OptionType) => {
		setTempState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm isOpen={isOpen} onClick={isOpenHandler}>
				{{
					formTitle: (
						<Text size={31} weight={800} uppercase={true} family='open-sans'>
							Задайте параметры
						</Text>
					),
					fontSelector: (
						<Select
							selected={tempState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(value) => handleTempChange('fontFamilyOption', value)}
							title='шрифт'
						/>
					),
					fontSizeSelector: (
						<RadioGroup
							name='размер шрифта'
							options={fontSizeOptions}
							selected={tempState.fontSizeOption}
							title='размер шрифта'
							onChange={(value) => handleTempChange('fontSizeOption', value)}
						/>
					),
					fontColorSelector: (
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={tempState.fontColor}
							onChange={(value) => handleTempChange('fontColor', value)}
						/>
					),
					separator: <Separator />,
					backgroundColor: (
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={tempState.backgroundColor}
							onChange={(value) => handleTempChange('backgroundColor', value)}
						/>
					),
					widthContent: (
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={tempState.contentWidth}
							onChange={(value) => handleTempChange('contentWidth', value)}
						/>
					),
					resetButton: (
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clearHandler}
						/>
					),
					confirmButton: (
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={confirmHandler}
						/>
					),
				}}
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
