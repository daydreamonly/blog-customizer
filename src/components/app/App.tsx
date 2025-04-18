import { defaultArticleState } from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [articleCurrentState, setArticleCurrentState] =
		useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleCurrentState.fontFamilyOption.value,
					'--font-size': articleCurrentState.fontSizeOption.value,
					'--font-color': articleCurrentState.fontColor.value,
					'--container-width': articleCurrentState.contentWidth.value,
					'--bg-color': articleCurrentState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onConfirm={(newState) => setArticleCurrentState(newState)}
				onReset={() => setArticleCurrentState(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};
