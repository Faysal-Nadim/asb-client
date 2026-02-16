import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopSettings } from "../../redux/actions";

/**
 * @author
 * @function Settings
 **/

export const Settings = (props) => {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getShopSettings());
  }, [dispatch]);

  return (
    <div className="max-w-[1380px] mx-auto lg:py-4 space-y-4">
      {shop.shopSettings ? JSON.stringify(shop.shopSettings) : "Loading..."}
    </div>
  );
};
