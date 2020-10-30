/**
 * @author WMXPY
 * @namespace Optimization
 * @description Constraint
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { ConstraintManager } from "../../src";

describe('Given {ConstraintManager} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('optimization-constraint');

    it('should be able to construct', (): void => {

        const constraint: ConstraintManager<any> = ConstraintManager.create();

        expect(constraint).to.be.instanceOf(ConstraintManager);
    });
});
