import { useEffect, useState } from 'react';

import { assets } from '@/libs/assets';

const useVideoThumbnail = (props: { videoUrl: string, seekTo?: number }) => {
  const [thumbnail, setThumbnail] = useState(assets.loader);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { videoUrl, seekTo = 1.0 } = props;

  const getThumbnail = () => new Promise<string>((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    let currentTime = seekTo;
    video.src = videoUrl;

    setLoading(true);

    video.onloadedmetadata = () => {
      if (video.duration < currentTime) currentTime = 0.1;
      video.currentTime = currentTime;
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } else {
        reject('Failed to get canvas context');
      }

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