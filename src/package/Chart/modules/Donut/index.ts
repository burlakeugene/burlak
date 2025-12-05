import Slice from '../Slice';
import { EType } from '../types';

export default class Donut extends Slice {
  constructor(props) {
    super({
      type: EType.DONUT,
      ...props,
    });
  }
}
