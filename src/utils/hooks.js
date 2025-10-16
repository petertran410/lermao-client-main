import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useGetParamsURL = () => {
  const searchParams = useSearchParams();
  const params = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

export const useSetParamsURL = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParamsString = (params) => {
    const paramsData = new URLSearchParams(searchParams.toString());
    Object.entries(params).map(([key, value]) => {
      value ? paramsData.set(key, `${value}`) : paramsData.delete(key);
    });

    return paramsData.toString();
  };

  return (params) => {
    router.push(pathname + '?' + getParamsString(params), { scroll: false });
  };
};

export const useParamsURL = () => {
  const setParamsURL = useSetParamsURL();
  const paramsURL = useGetParamsURL();

  return [paramsURL, setParamsURL];
};
