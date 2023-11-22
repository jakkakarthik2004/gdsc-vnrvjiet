import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const envFilePath = `${process.env.NODE_ENV || 'development'}.env`;
    const fileExists = fs.existsSync(envFilePath);

    if (fileExists) {
      this.envConfig = dotenv.parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = process.env;
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
