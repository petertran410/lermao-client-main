import { CK_TOKEN } from '@/utils/const';
import Cookies from 'js-cookie';
import { atom, selector } from 'recoil';

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: undefined
});

const tokenAtom = atom({
  key: 'tokenAtom',
  default: new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }
    const token = Cookies.get(CK_TOKEN) || '';
    resolve(token);
  })
});

export const tokenState = selector({
  key: 'tokenSelector',
  get: ({ get }) => get(tokenAtom),
  set: ({ set }, newValue) => {
    set(tokenAtom, newValue);
    if (!newValue) {
      Cookies.remove(CK_TOKEN);
      return;
    }
    Cookies.set(CK_TOKEN, newValue, { secure: true });
  }
});

const LS_CART = 'cart';

export const cartAtom = atom({
  key: 'CART_ATOM',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      if (typeof window !== 'undefined') {
        const localCart = localStorage.getItem(LS_CART);
        try {
          if (typeof localCart === 'string') {
            setSelf(JSON.parse(localCart) || []);
          }
        } catch (error) {}

        onSet((newData) => {
          if (newData) {
            localStorage.setItem(LS_CART, JSON.stringify(newData));
          } else {
            localStorage.removeItem(LS_CART);
          }
        });
      }
    }
  ]
});
