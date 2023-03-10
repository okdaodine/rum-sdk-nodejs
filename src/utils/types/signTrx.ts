import { IActivity } from '../../chain/types/activity';

export interface ISignTrxPayload {
  groupId: string;
  data: IActivity;
  trxId?: string;
  version?: string;
  timestamp?: number
  aesKey: string;
  agePublicKeys?: string[];
  privateKey?: string;
  publicKey?: string;
  sign?: (hash: string) => string | Promise<string>
}