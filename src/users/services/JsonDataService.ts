import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { UserType } from '@users/types/user.type';

@Injectable()
export class JsonDataService {
  pathFile = './data/users.json';

  public async GetData(): Promise<UserType[]> {
    try {
      if (!fs.existsSync(this.pathFile)) {
        await this.WriteData([]);
      }

      const rawData = fs.readFileSync(this.pathFile, 'utf-8');

      return JSON.parse(rawData);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async WriteData(data: UserType[]): Promise<boolean> {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.pathFile, jsonData, 'utf-8');

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
