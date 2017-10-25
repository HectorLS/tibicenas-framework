import Arrive              from 'arrive';
import FiniteStatesMachine from 'javascript-state-machine';

class Fsm {
  constructor() {
    this.options = {
      transitions: [
        {},
        {},
        {}
      ]
    }
    init();
  }

  init() {
    this.machine = new FiniteStatesMachine(this.options);
    /* init: STRING, transitions: ARRAY OF OBJECTS, methods: Object of funtions */
  }
}

export default Fsm;
