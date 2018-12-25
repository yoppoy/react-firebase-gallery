import getCoord from '../index.js'
import "isomorphic-fetch"

describe('getCoord()', () => {
    it('Returns the right coordinates for London', () => {
        console.log("hey");
        getCoord("London, United Kingdom").then((coord) => {
            console.log("hello");
            console.log(coord);
            expect(coord).toEqual(5);
        }).catch(e => {
            console.log(e);
        }) ;
    });
    it("doesn't add the third number", () => {
    });
});
