import Arrive              from 'arrive';
import FiniteStatesMachine from 'javascript-state-machine';

class Fsm {
  constructor() {
    this.options = {
      init: 'unmounted',
      transitions: [
        { name: 'mount',   from: 'unmounted',                      to: 'mounted'   },
        { name: 'render',  from: 'mounted',                        to: 'rendered'  },
        { name: 'update',  from: 'rendered',                       to: 'updated'   },
        { name: 'unmount', from: ['mounted', 'rendered, updated'], to: 'unmounted' },
      ],
      data: {},
      methods: {}
    };
    this.init();
  }

  init(element) {
    document.arrive(element, (e) => {
      this.machine = FiniteStatesMachine.factory(this.options);
      console.log('init FSM');
      return this.machine;
    })

    /* init: STRING, transitions: ARRAY OF OBJECTS, methods: Object of funtions */
  }
}

export default Fsm;
// document.arrive('.spinner', (e) => {
  // console.log(e);
// })



// -MOUNTING
//   -UNCREATED-
//
//   -CREATING-
//     constructor()
//     componentWillMount()
//     render()
//
//   -RENDERED-
//     componentDidMount()
//
//
// -UPDATING
//   -RECEIVING PROPS-
//     componentWillReceiveProps()
//
//
//   -RECEIVING STATE-
//     shouldComponentUpdate()
//     componentWillUpdate()
//     render()
//
//   -RE-RENDERED-
//     componentDidUpdate()
//
// -UNMOUNTING
//   -RENDERED
//
//   -REMOVING-
//     componentWillUnmount()
//
//   -REMOVED-
