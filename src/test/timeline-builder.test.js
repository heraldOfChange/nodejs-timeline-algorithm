'use strict';

const pretty = (array) => array.filter(x => typeof x === 'object').length > 0 ?
    array.map(x => `{${x.join(',')}}`).join(' ') : `{${array.join(',')}}`;

describe('class TimeLineBuilder', () => {
    describe('addDate injects a single date for conflicting cases', () => {
        [
            {initialState: [[1, 3]], input: 2, expected: [[1, 2], [2, 3]]},
            {initialState: [[1, 3], [4, 8]], input: 5, expected: [[1, 3], [4, 5], [5, 8]]},
            {initialState: [[1, 3], [7, 9]], input: 8, expected: [[1, 3], [7, 8], [8, 9]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDate for initialState: ${pretty(initialState)} input: ${input} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDate(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('addDates should be able to resolve date range input', () => {
        [
            {initialState: [[1, 3]], input: [0, 2], expected: [[0, 1], [1, 2], [2, 3]]},
            {initialState: [[1, 3]], input: [2, 4], expected: [[1, 2], [2, 3], [3, 4]]},
            {initialState: [[1, 3], [4, 8]], input: [0, 5], expected: [[0, 1], [1, 3], [4, 5], [5, 8]]},
            {initialState: [[1, 3], [7, 9]], input: [2, 10], expected: [[1, 2], [2, 3], [7, 9], [9, 10]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('lefthand & righthand cases', () => {
        [
            {initialState: [[3, 6]], input: [1, 4], expected: [[1, 3], [3, 4], [4, 6]]},
            {initialState: [[3, 6]], input: [1, 5], expected: [[1, 3], [3, 5], [5, 6]]},
            {initialState: [[3, 6]], input: [2, 4], expected: [[2, 3], [3, 4], [4, 6]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });

        [
            {initialState: [[3, 6]], input: [4, 9], expected: [[3, 4], [4, 6], [6, 9]]},
            {initialState: [[3, 6]], input: [5, 9], expected: [[3, 5], [5, 6], [6, 9]]},
            {initialState: [[3, 6]], input: [4, 10], expected: [[3, 4], [4, 6], [6, 10]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('supserset & subset cases', () => {
        [
            {initialState: [[3, 6]], input: [0, 9], expected: [[0, 3], [3, 6], [6, 9]]},
            {initialState: [[3, 6]], input: [1, 9], expected: [[1, 3], [3, 6], [6, 9]]},
            {initialState: [[3, 6]], input: [2, 9], expected: [[2, 3], [3, 6], [6, 9]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });

        [
            {initialState: [[0, 10]], input: [1, 2], expected: [[0, 1], [1, 2], [2, 10]]},
            {initialState: [[0, 10]], input: [1, 3], expected: [[0, 1], [1, 3], [3, 10]]},
            {initialState: [[0, 10]], input: [1, 4], expected: [[0, 1], [1, 4], [4, 10]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('intersection cases', () => {
        [
            {initialState: [[1, 10]], input: [10, 15], expected: [[1, 10], [10, 15]]},
            {initialState: [[1, 10]], input: [0, 1], expected: [[0, 1], [1, 10]]},
            {initialState: [[1, 10]], input: [10, 15], expected: [[1, 10], [10, 15]]}
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('lefthand, righthand, subset/superset combination cases', () => {
        [
            {
                initialState: [[2, 4], [6, 8], [10, 12], [14, 16]],
                input: [3, 15],
                expected: [[2, 3], [3, 4], [6, 8], [10, 12], [14, 15], [15, 16]]
            },
            {
                initialState: [[2, 4], [6, 8], [10, 12], [14, 16]],
                input: [3, 15],
                expected: [[2, 3], [3, 4], [6, 8], [10, 12], [14, 15], [15, 16]]
            },
            {
                initialState: [[2, 4], [6, 8], [10, 12], [14, 16]],
                input: [3, 15],
                expected: [[2, 3], [3, 4], [6, 8], [10, 12], [14, 15], [15, 16]]
            }
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const input = testData.input;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(input)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                const actual = TimeLineBuilder.addDates(input).getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('simulated series of inputs', () => {
        [
            {
                initialState: [[1, 20]],
                inputs: [[1, 5], [4, 6], [7, 8], [8, 9], [13, 15]],
                expected: [[1, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 13], [13, 15], [15, 20]]
            },
            {
                initialState: [1993, 2018],
                inputs: [[1993, 1997], [1995, 1998], [2001, 2003], [2003, 2004], [2010, 2014]],
                expected: [[1993, 1995], [1995, 1997], [1997, 1998], [1998, 2001], [2001, 2003], [2003, 2004], [2004, 2010], [2010, 2014], [2014, 2018]]
            }
        ].forEach(testData => {
            // testScenario setup
            const initialState = testData.initialState;
            const inputs = testData.inputs;
            const expected = testData.expected;

            // test
            it(`addDates for initialState: ${pretty(initialState)} input: ${pretty(inputs)} returns expected: ${pretty(expected)}`, () => {
                const TimeLineBuilder = require('../main/timeline-builder-factory')();
                TimeLineBuilder.initialize(initialState);

                inputs.forEach(input => TimeLineBuilder.addDates(input));

                const actual = TimeLineBuilder.getTimeLine();
                expect(actual).toEqual(expected);
            });
        });
    });
});