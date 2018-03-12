import * as mongoose from 'mongoose';
import { config } from '../../config';

export class MongoConnectionService {
  public readonly connection: mongoose.Connection;
  constructor(private connectionString: string) {
    // Mongoose: mpromise (mongoose's default promise library) is deprecated,
    // plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
    // https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose#promises
    (mongoose as any).Promise = global.Promise;
    this.connection = mongoose.createConnection(connectionString, {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      bufferMaxEntries: 0,
    });
    this.setupTriggers(this.connection);
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', this.gracefulExit).on('SIGTERM', this.gracefulExit);
  }

  public close() {
    this.connection.close(() => {
      console.log(`mongodb connection ${this.connectionString} closed`);
    });
  }

  private setupTriggers(connection: mongoose.Connection) {
    connection
      .once('open', () => {
        console.log(`mongodb connection created to ${this.connectionString}`);
      })
      .on('disconnected', () => {
        console.log('mongodb disconnected');
      })
      .on('reconnect', () => {
        console.log('mongodb reconnected');
      })
      .on('error', (error: any) => {
        console.warn(`Warning: ${error}`);
      });
  }

  private gracefulExit() {
    this.connection.close(() => {
      console.log(`mongodb connection ${this.connectionString} is disconnected through app termination`);
      process.exit(0);
    });
  }
}

export const mongoConnectionService = new MongoConnectionService(config.MONGO_CONNECTION_STRING);
