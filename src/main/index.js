'use strict';

const timeLineBuilder = require('./timeline-builder-factory')();

const initialState = [1993, 2018];
timeLineBuilder.initialize(initialState);

console.info(`initial TimeLine state: ${JSON.stringify(timeLineBuilder.getTimeLine())}\n`);

const inputSimulator = [[1993, 1997], [1995, 1998], [2001, 2003], [2003, 2004], [2010, 2014]];

inputSimulator.forEach(input => {
    timeLineBuilder.addDates(input);
    console.info(`insert date range [${input}] -> ${JSON.stringify(timeLineBuilder.getTimeLine())}`);
});

console.info(`\nResulting TimeLine: ${JSON.stringify(timeLineBuilder.getTimeLine())}`);
