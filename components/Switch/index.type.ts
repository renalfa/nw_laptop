export interface SwitchProps {
  status: boolean;
  productId: string;
  onSwitch: (productId: string, payload: any) => void;
}
