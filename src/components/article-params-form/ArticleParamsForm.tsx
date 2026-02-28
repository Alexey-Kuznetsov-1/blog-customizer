import React, { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	onApply: (params: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onApply,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleToggle = (): void => {
		setIsOpen(!isOpen);
	};

	const handleApply = (): void => {
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = (): void => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	const updateFormState = (
		key: keyof ArticleStateType,
		value: OptionType
	): void => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />

			<div
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option: OptionType) =>
							updateFormState('fontFamilyOption', option)
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option: OptionType) =>
							updateFormState('fontSizeOption', option)
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option: OptionType) =>
							updateFormState('fontColor', option)
						}
					/>

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option: OptionType) =>
							updateFormState('backgroundColor', option)
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option: OptionType) =>
							updateFormState('contentWidth', option)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='clear' />
						<Button title='Применить' onClick={handleApply} type='apply' />
					</div>
				</form>
			</div>
		</div>
	);
};
