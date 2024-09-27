## Dependencies
 - node
 - npm

## To run locally
  - In console navigate to /currency-converter
  - run command `npm run dev`

## Thoughts
  This app was quite challenging, having very little exposure to React.
  I am heppy with how the majority of it has turned out although I know there is much to optimise still and some issues to fix.

  The particular areas that took the most of my time was:
  - Originally I attemted to use [text](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml) to bulk get the rates on appstart but ran into CORS issues that would have taken too long to resolve.
  - I then attempted a wildcard call to [text](https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A?firstNObservations=1&format=jsondata) to again get the bulk of the data but it was large and unmanageable.
  - I then used the same url, passing in only the two currencies I wanted the exchange rates for. This would have worked but there were inconsistencies with which currency value was returned first and as they had no name property it became unmanageable.

  - Sharing data between react components took a bit of figuring out but I think I understand it much better now.

  Overall I really enjoyed this but would have liked to have done a bit better.
