# NodeJS - TimeLine Algorithm Solution

## technical specifications

- should be able to insert date ranges into a timeline in chronological order
- there are 8 possible scenarios that are obvious

## test scenarios

1. before timeline
2. after timeline
3. lefthand conflict
4. righthand conflict
5. subset
6. superset
7. intersection
8. left, right, superset combinations

## test run simulation

initialState: [1993,2018]
input: [1993,1997] [1995,1998] [2001,2003] [2003,2004] [2010,2014]
expected: [1993,1995],[1995,1997],[1997,1998],[1998,2001],[2001,2003],[2003,2004],[2004,2010],[2010,2014],[2014,2018]
