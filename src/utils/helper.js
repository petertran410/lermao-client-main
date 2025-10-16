import { createStandaloneToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

export const showToast = (config) => {
  const { content, status = 'info', title } = config;
  const { toast } = createStandaloneToast();
  return toast({
    description: content,
    status,
    title,
    duration: 4000,
    isClosable: true,
    position: 'top-right'
  });
};

export const useMediaQuery = (query) => {
  const getMatches = (query) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));
  const handleChange = useCallback(() => setMatches(getMatches(query)), [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [handleChange, query]);

  return matches;
};

export const getInlineHTML = (cartData = []) => {
  if (!Array.isArray(cartData) || !cartData.length) {
    return '';
  }

  return `<div>
  ${cartData
    .map(
      (i) => `<div style="margin-top: 20px;">
    <img src="${i.imagesUrl?.[0]?.replace(
      'http://',
      'https://'
    )}" style="width: 80px; height: 60px; object-fit:cover; border-radius: 3px; float:left; margin-right: 15px;" />
    <div>
      <p style="font-weight: 600; margin: 0;">${i.title}</p>
      <p>Số lượng: 1</p>
    </div>
  </div>`
    )
    .join('\n')}
</div>`;
};
