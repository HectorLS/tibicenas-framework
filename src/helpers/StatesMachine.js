import Arrive              from 'arrive';
import FiniteStatesMachine from 'javascript-state-machine';


class States {
  constructor() {
    this.options = {
      init: 'unmounted',
      transitions: [
        { name: 'mount',   from: 'unmounted',                      to: 'mounted'   },
        { name: 'render',  from: 'mounted',                        to: 'rendered'  },
        { name: 'update',  from: 'rendered',                       to: 'updated'   },
        { name: 'unmount', from: ['mounted', 'rendered, updated'], to: 'unmounted' },
      ],
      methods: {
        onMount   : () => { console.log('I mounted'); return true;},
        onRender  : () => { console.log('I rendered')  },
        onUpdate  : () => { console.log('I updated')   },
        onUnmount : () => { console.log('I unmounted') }
      }
    };
    this.init();
  }

  init() {
    console.log('******* StateMachine Factory initialized *******')
    this.machine = FiniteStatesMachine.factory(this.options);
  }
}

export default States;

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
