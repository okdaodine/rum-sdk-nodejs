
export interface IListAppConfigKeysOptions {
  groupId: string;
}

export interface IGetAppConfigByKeyOptions {
  groupId: string;
  key: string;
}

export interface IAppConfigKeyListItem {
  Name: string;
  Type: string;
}

export interface IAppConfigItem {
  Memo: string
  Name: string
  OwnerPubkey: string
  OwnerSign: string
  TimeStamp: number
  Type: 'INT' | 'BOOL' | 'STRING'
  Value: number | boolean | string
}