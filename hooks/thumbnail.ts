'use client';

import { useEffect, useState } from 'react';
import { getSrc } from '@/utils';

const useVideoThumbnail = (props: { videoUrl: string, seekTo?: number }) => {
  const [thumbnail, setThumbnail] = useState('/images/placeholder-white.webp');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { videoUrl, seekTo = 1.0 } = props;

  const getThumbnail = () => new Promise<string>(async (resolve, reject) => {
    const video = document.createElement('video');
    video.src = await getSrc(videoUrl);
    video.crossOrigin = 'anonymous';
    let currentTime = seekTo;
    setLoading(true);

    video.onloadedmetadata = () => {
      if (video.duration < currentTime) currentTime = 0.1;
      video.currentTime = currentTime;
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      
      if (!ctx) return reject('Failed to get canvas context');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.src = '';
      video.load();
      
      resolve(canvas.toDataURL('image/png'));
    };

    video.onerror = () => {
      reject('Failed to load video');
    }

    setLoading(false);
  });

  useEffect(() => {
    if (videoUrl) {
      getThumbnail().then(setThumbnail).catch(setError);
    }
  }, [videoUrl, seekTo]);

  return { thumbnail, loading, error };
};

export default useVideoThumbnail;