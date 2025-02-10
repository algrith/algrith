import { Middleware, isAction } from '@reduxjs/toolkit';
import { inProduction } from '.';

export const loggerMiddleware: Middleware = api => next => action => {
	if (!inProduction && isAction(action)) {
		console.group('Redux:', action.type);
		console.info('Dispatching:', action);
		const nextAction = next(action);

		console.log('Next State:', api.getState());
		console.groupEnd();
		return nextAction;
  }

  return next(action);
};