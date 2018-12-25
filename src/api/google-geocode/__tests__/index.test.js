import getCoord from '../index.js'
import "isomorphic-fetch"

describe('getCoord()', () => {
    it('Returns the right coordinates for "London, United Kingdom"', () => {
        expect.assertions(2);
        return getCoord("London, United Kingdom").then((coord) => {
            expect(coord.lat).toEqual(51.5073509);
            expect(coord.lng).toEqual(-0.1277583);
        });
    });
    it('Returns the right coordinates for "Paris"', () => {
        expect.assertions(2);
        return getCoord("Paris").then((coord) => {
            expect(coord.lat).toEqual(48.856614);
            expect(coord.lng).toEqual(2.3522219);
        });
    });
    it('Returns an error with a city that doesn\'t exist', () => {
        return getCoord("hfejzhfzejkkhe").catch(e => {
            expect(e).toEqual('Request failed : TypeError: Cannot read property \'getElementsByTagName\' of undefined');
        });
    });
    it('Returns an error with an empty param', () => {
        return getCoord(null).catch(e => {
            expect(e).toEqual('Undefined parameter');
        });
    });
});
