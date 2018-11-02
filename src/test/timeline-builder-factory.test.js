'use strict';

describe('TimeLineBuilderFactory', () => {
    describe('spawns an instance of TimeLineBuilder', () => {
        it('calling the factory method returns an instance of TimeLineBuilder', () => {
            const actual = require('../main/timeline-builder-factory');
            expect(typeof actual === 'function').toBeTruthy();
            expect(actual()).not.toBe(null);
        });
    });
});