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

    const chance: Chance.Chance = new Chance('optimization-particle-swarm');

    it('should be able to construct', (): void => {

        const PSO: ParticleSwarmOptimization<any> = ParticleSwarmOptimization.create({

            particles: 3,
            iterations: 10,

            initialization: () => ({}),
            function: () => chance.natural(),
        });

        expect(PSO).to.be.instanceOf(ParticleSwarmOptimization);
    });
});
