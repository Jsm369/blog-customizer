import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleStyles, setArticleStyles] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const handleApply = (styles: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => {
		setArticleStyles(styles);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamily,
					'--font-size': articleStyles.fontSize,
					'--font-color': articleStyles.fontColor,
					'--container-width': articleStyles.contentWidth,
					'--bg-color': articleStyles.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} />
			<Article
				fontFamily={articleStyles.fontFamily}
				fontSize={articleStyles.fontSize}
				fontColor={articleStyles.fontColor}
				backgroundColor={articleStyles.backgroundColor}
				contentWidth={articleStyles.contentWidth}
			/>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
