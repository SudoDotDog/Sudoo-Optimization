/**
 * @author WMXPY
 * @namespace Optimization
 * @description Particle Swarm
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { ParticleSwarmOptimization } from "../../src";

describe('Given {ParticleSwarmOptimization} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('optimization-particle-swarm');

    it('should be able to construct', (): void => {

        const PSO: ParticleSwarmOptimization = ParticleSwarmOptimization.create();

        expect(PSO).to.be.instanceOf(ParticleSwarmOptimization);
    });
});
