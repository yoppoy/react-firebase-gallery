import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('jsdom-global')();

global.DOMParser = window.DOMParser;
configure({ adapter: new Adapter() });
