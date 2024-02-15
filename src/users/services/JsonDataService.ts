import * as fs from 'fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserType } from '@users/types/user.type';

@Injectable()
export class JsonDataService {
  pathFile = './data/users.json';
  encoding = 'utf-8' as BufferEncoding;

  public async GetData(): Promise<UserType[]> {
    try {
      if (!fs.existsSync(this.pathFile)) {
        await this.WriteData([]);
      }

      const rawData = fs.readFileSync(this.pathFile, this.encoding);

      return JSON.parse(rawData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async WriteData(data: UserType[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.pathFile, jsonData, this.encoding);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
