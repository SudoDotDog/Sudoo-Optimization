/**
 * @author WMXPY
 * @namespace Optimization
 * @description Util
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { createVelocitiesByExample } from "../../src";

describe('Given [Util] Helper Methods', (): void => {

    const chance: Chance.Chance = new Chance('optimization-util');

    it('should be able to create velocities by example', (): void => {

        const variables: Record<string, number> = {

            hello: chance.natural(),
            world: chance.natural(),
        };

        const velocities = createVelocitiesByExample(variables, 2);

        expect(velocities).to.be.lengthOf(2);
        expect(velocities).to.be.deep.equal([{
            hello: 0,
            world: 0,
        }, {
            hello: 0,
            world: 0,
        }]);
    });
});
