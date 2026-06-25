'use client';

import React from 'react';
import { type Socket } from 'socket.io-client';

export const SocketContext = React.createContext<Socket | null>(null);
export const useSocketContext = () => React.useContext(SocketContext);