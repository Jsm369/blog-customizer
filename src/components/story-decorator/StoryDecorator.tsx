import { Decorator } from '@storybook/react';
import styles from './StoryDecorator.module.scss';

export const StoryDecorator: Decorator = (Story) => (
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	<div className={styles.storybookContainer}>
		<Story />
	</div>
);
