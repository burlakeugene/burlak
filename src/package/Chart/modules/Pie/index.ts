import Slice from '../Slice';
import { EType } from '../types';

export default class Pie extends Slice {
  constructor(props) {
    super({
      type: EType.PIE,
      ...props,
    });
  }
}
