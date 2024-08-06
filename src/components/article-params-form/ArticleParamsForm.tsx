import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'components/separator';

type ArticleFormProps = {
	onApply: (styles: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => void;
};

const initialState = {
	fontFamily: fontFamilyOptions[0],
	fontSize: fontSizeOptions[0],
	fontColor: fontColors[0],
	backgroundColor: backgroundColors[0],
	contentWidth: contentWidthArr[0],
};

export const ArticleParamsForm = ({ onApply }: ArticleFormProps) => {
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		initialState.fontFamily
	);
	const [selectedContentSize, setSelectedContentSize] = useState(
		initialState.contentWidth
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		initialState.fontSize
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		initialState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		initialState.backgroundColor
	);
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		onApply({
			fontFamily: selectedFontFamily.value,
			fontSize: selectedFontSize.value,
			fontColor: selectedFontColor.value,
			backgroundColor: selectedBackgroundColor.value,
			contentWidth: selectedContentSize.value,
		});
	};

	const handleReset = () => {
		onApply({
			fontFamily: initialState.fontFamily.value,
			fontSize: initialState.fontSize.value,
			fontColor: initialState.fontColor.value,
			backgroundColor: initialState.backgroundColor.value,
			contentWidth: initialState.contentWidth.value,
		});
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	useEffect(() => {
		onApply({
			fontFamily: initialState.fontFamily.value,
			fontSize: initialState.fontSize.value,
			fontColor: initialState.fontColor.value,
			backgroundColor: initialState.backgroundColor.value,
			contentWidth: initialState.contentWidth.value,
		});
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				ref={ref}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleApply}>
					<Select
						selected={selectedFontFamily}
						onChange={setSelectedFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={selectedContentSize}
						onChange={setSelectedContentSize}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
