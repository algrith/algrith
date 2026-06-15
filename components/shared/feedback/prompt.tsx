'use client';

import { ButtonProps, Popconfirm, PopconfirmProps } from 'antd';
import { useEffect, useState, MouseEvent } from 'react';

import { PromptDescriptionWrapper } from './styled';
import colors from '@/libs/colors';

const Prompt = (props: PopconfirmProps & { target: string; onConfirmed: () => void; }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const buttonStyle = {
    fontWeight: 500,
    fontSize: 13,
    height: 32
  };
  
  const {
    cancelText = `Don't show again`,
    okText = 'Proceed',
    placement = 'top',
    onConfirmed,
    target,
    title
  } = props;

	const handleCancellation = (e?: MouseEvent | KeyboardEvent) => {
		const showPrompt = JSON.parse(localStorage.showPrompt);
		localStorage.showPrompt = JSON.stringify({
      ...showPrompt,
      [target]: false
    });

    setShowPrompt(false);
    e?.stopPropagation();
	};

	const handleOpenChange = (isOpened: boolean) => {
    const show = JSON.parse(localStorage.showPrompt)[target];
    if (!isOpened) return setShowPrompt(false);
    if (!show) return handleConfirmation();
    setShowPrompt(true);
  };

	const handleConfirmation = () => {
    setShowPrompt(false);
    onConfirmed();
	};

  const Description = () => {
    const description = props.description;

    return (
      typeof description === 'string' ? (
        <PromptDescriptionWrapper
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <PromptDescriptionWrapper>
          {typeof description === 'function' ? description() : description}
        </PromptDescriptionWrapper>
      )
    );
  };

  const buttonProps = {
    okButton: {
      style: {
        backgroundColor: colors.theme.primary,
        ...buttonStyle
      }
    } as ButtonProps,
    cancelButton: {
      style: buttonStyle
    } as ButtonProps
  };

  useEffect(() => {
    if (!localStorage?.showPrompt) {
      localStorage.showPrompt = JSON.stringify({});
    }

    const showPrompt = JSON.parse(localStorage.showPrompt);

    if (!(target in showPrompt)) {
      localStorage.showPrompt = JSON.stringify({
        [target]: true,
        ...showPrompt
      });
    }
  }, []);

	return (
    <Popconfirm
      cancelButtonProps={buttonProps.cancelButton}
      okButtonProps={buttonProps.okButton}
      onOpenChange={handleOpenChange}
      onConfirm={handleConfirmation}
      onCancel={handleCancellation}
      description={<Description />}
      cancelText={cancelText}
      placement={placement}
      open={showPrompt}
      okText={okText}
      title={title}
    >
      {props.children}
    </Popconfirm>
  );
};

export default Prompt;