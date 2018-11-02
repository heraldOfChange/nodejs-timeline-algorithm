'use strict';

// conditional mutations
const isBetween = (observed, input) => observed[0] <= input && observed[1] >= input;
const isAfter = (TimeLine, input) => TimeLine.filter(x => x[0] > input).sort((a, b) => a[0] - b[0])[0];
const isBefore = (TimeLine, input) => TimeLine.filter(x => x[1] < input).sort((a, b) => b[1] - a[1])[0];

// helper functions to ensure validity of the TimeLine
const deduplicate = (filthyTimeLine) => filthyTimeLine.filter(x => x[0] !== x[1]);
const sorted = (unsortedArray) => unsortedArray.sort((a, b) => a[0] - b[0]);
const refineTimeLine = (TimeLine) => sorted(deduplicate(TimeLine));

class TimeLineBuilder {
    constructor() {
        this.timeLine = [];
    }

    initialize(initialState) {
        this.timeLine = !initialState.filter(x => typeof x === 'object').length > 0 ? [initialState] : initialState || [];

        return this;
    }

    addDate(input) {
        const conflict = this.timeLine.find(observed => isBetween(observed, input));
        this.timeLine = this.timeLine.filter(x => x !== conflict);

        this.timeLine.push([conflict[0], input]);
        this.timeLine.push([input, conflict[1]]);

        return this;
    }

    addDates(input) {
        const conflicts = input.filter(date => typeof this.timeLine.find(observed => isBetween(observed, date)) === 'object');

        if (conflicts.length === input.length) input.forEach(date => this.addDate(date));
        else if (conflicts.length > 0) {
            const noConflict = input.find(date => !conflicts.includes(date));
            const after = isAfter(this.timeLine, noConflict);
            const before = isBefore(this.timeLine, noConflict);

            if (typeof after === 'object') this.timeLine.push([noConflict, after[0]]);
            else this.timeLine.push([before[1], noConflict]);

            conflicts.forEach(conflict => this.addDate(conflict));
        } else {
            input.forEach(noConflict => {
                const after = isAfter(this.timeLine, noConflict);
                const before = isBefore(this.timeLine, noConflict);

                if (typeof after !== 'object' && typeof before !== 'object') this.timeLine.push(input);
                else {
                    if (typeof after === 'object') this.timeLine.push([noConflict, after[0]]);
                    else this.timeLine.push([before[1], noConflict]);
                }
            });
        }

        return this;
    }

    getTimeLine() {
        return refineTimeLine(this.timeLine);
    }
}

module.exports = () => new TimeLineBuilder();