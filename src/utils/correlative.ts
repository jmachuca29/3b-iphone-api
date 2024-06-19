import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

export default function sequenceGenerator(connection: Connection) {
  const AutoIncrement = AutoIncrementFactory(connection);
  return AutoIncrement;
}
