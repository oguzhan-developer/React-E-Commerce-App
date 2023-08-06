import { message } from "antd";

export const alertSuccesAddFavorite = () => {
    message.success("Favorilere eklendi.", 1);
  };
  export const alertSuccesRemoveFavorite = () => {
    message.success("Favorilerden çıkarıldı.", 1);
  };
  export const alertNotLoginFavorite = () => {
    message.info("Lütfen giriş yapın.", 1);
  };

  export const alertSuccesRegister = (name) => {
    message.success(`Hoşgeldin ${name}`);
  };
  export const alertSuccesLogin = () => {
    message.success("Tekrar hoşgeldin.")
  }