import * as CryptoJS from 'crypto-js';

export class CryptoJs
{

    secretKey = "Secret Passphras";
    
    encrypt(value : string) : string
    {
      return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
    }
  
    decrypt(textToDecrypt : string)
    {
      return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    }

    
}