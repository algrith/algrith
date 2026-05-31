'use client';

import { useEffect } from 'react';

import { updateSidebar } from '@/components/dashboard/reducer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import useWindowDimensions from '@/hooks/viewport';

const useSidebarController = () => {
	const { dimensions: { width }, isMobile } = useWindowDimensions();
  const { sidebar } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

	const handleSidebar = () => dispatch(updateSidebar({
		collapsed: !sidebar.collapsed
	}));
	
	const closeMobileSidebar = () => {
		if (width <= 912 && !sidebar.collapsed) {
			dispatch(updateSidebar({
				collapsed: true
			}));
		}
	};

	const handleMouseEnter = () => {
		if (!sidebar.collapsed) return;
    
		dispatch(updateSidebar({
			collapsedBeforeHover: sidebar.collapsed,
			collapsed: !sidebar.collapsed
		}));
	};

	const handleMouseLeave = () => {
		if (!sidebar.collapsedBeforeHover) return;
		dispatch(updateSidebar({
			collapsedBeforeHover: false,
			collapsed: true
		}))
	};

  useEffect(() => {
    dispatch(updateSidebar({
      collapsedBeforeHover: width <= 912 ? true : false,
      collapsed: width <= 912 ? true : false
    }));
  }, [width]);

	return {
		closeMobileSidebar,
    handleMouseEnter,
    handleMouseLeave,
    handleSidebar,
		isMobile,
    sidebar
  };
};

export default useSidebarController;