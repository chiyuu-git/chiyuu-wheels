import Component from '../../lib/components/index.js';
import store from '../store/index.js';

export default class Status extends Component {
  constructor() {
    super({
        store,
        element: document.querySelector('.js-status')
    });
  }

  render() {
    let suffix = store.state.items.length !== 1 ? 's' : '';
    this.element.innerHTML = `${store.state.items.length} item${suffix}`;
  }
}
