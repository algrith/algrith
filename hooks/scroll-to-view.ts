import React, { useEffect, useState } from 'react';

interface UseScrollIntoViewProps {
	parentRef: React.RefObject<HTMLElement>;
	targetSelector: string;
	dependencies: any[];
};

const useScrollToLastChild = (props: UseScrollIntoViewProps) => {
	const { dependencies = [], parentRef, targetSelector } = props;

	useEffect(() => {
		if (parentRef.current) {
			const children = parentRef.current.querySelectorAll(targetSelector);
			const targetChild = children.item(children.length - 1);
			const scrollIntoViewTimeout = setTimeout(() => {
				targetChild?.scrollIntoView({ behavior: 'smooth' });
				clearTimeout(scrollIntoViewTimeout);
			}, 200);
		}
	}, dependencies);
};

export default useScrollToLastChild;