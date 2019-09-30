import getRandomString from "utils/getRandomString";
import getRandomDarkColor from "utils/getRandomDarkColor";

import { Wallet } from './Wallet';

export class WalletFactory {
  static build(name: string, balance: number, color?: string): Wallet {
    return {
      id: getRandomString(),
      name,
      balance,
      color: color || getRandomDarkColor()
    }
  }
}
