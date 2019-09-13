import { afterEach } from 'mocha';
import sinon from 'sinon';

// remove all sinon spies after each test
afterEach(() => sinon.restore());
