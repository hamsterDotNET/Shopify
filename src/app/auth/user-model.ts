export class User{
  constructor(public email: string, public id: string, private _token: string, private _tokenExpires: Date){

  }

  get token(){
    if (!this._tokenExpires || new Date() > this._tokenExpires){
      return null;
    }
    return this._token;
  }
}