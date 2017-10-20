import Arrive              from 'arrive';
import FiniteStatesMachine from 'javascript-state-machine';

class Fsm {
  constructor() {
    init();
  }

  init() {
    this.machine = new FiniteStatesMachine({ /* init: STRING, transitions: ARRAY OF OBJECTS, methods: Object of funtions */})
  }
}

export default Fsm;
