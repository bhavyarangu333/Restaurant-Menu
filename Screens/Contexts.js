import { createContext } from "react";

export const deliveryTimeContext = createContext({ deliveryTime: '', setDeliveryTime: () => {}});
export const pickupTimeContext = createContext({ pickupTime: '', setPickupTime: () => {} });
