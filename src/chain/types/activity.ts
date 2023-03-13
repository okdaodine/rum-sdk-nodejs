export interface IObject {
  type: string
  content?: string
  summary?: string
  id?: string
  name?: string
  image?: IObject | IObject[]
  inreplyto?: IObject
  attributedTo?: IObject | IObject[]
  mediaType?: string
  describes?: IObject
}

export interface IActivity extends IObject {
  type: string
  actor?: IObject;
  object?: IObject;
  target?: IObject;
  result?: IObject;
  origin?: IObject;
}
