export interface IObject {
  type: string
  content?: string
  summary?: string
  id?: string
  name?: string
  image?: IObject[]
  inreplyto?: IObject
  attributedTo?: IObject[]
}

export interface IActivity extends IObject {
  type: string
  actor?: IObject;
  object?: IObject;
  target?: IObject;
  result?: IObject;
  origin?: IObject;
}
