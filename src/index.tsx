import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const applyStyles = (params: ArticleStateType) => {
		setArticleState(params);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={{
				['--font-family' as any]: articleState.fontFamilyOption.value,
				['--font-size' as any]: articleState.fontSizeOption.value,
				['--font-color' as any]: articleState.fontColor.value,
				['--container-width' as any]: articleState.contentWidth.value,
				['--bg-color' as any]: articleState.backgroundColor.value,
			}}>
			<ArticleParamsForm onApply={applyStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
