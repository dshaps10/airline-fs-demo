# Airline-vertical Full Stack Demo

## Purpose

This demo is intended as a sandbox for partners to use when getting ramped up on Full Stack. Because they will not have access to the Optimizely account that this is linked to I will provide screen shots and gifs to help users of this demo app understand what's happening behind the scenes.

## Hypothetical Scenario

Pacific Airlines is  trying to increase its footprint in the Asia and Australia markets since the majority of their visitors are booking travel within North America. In order to drive more traffic to their international flights, they are experimenting with two different methods:

1. Redesigning and testing a new flight deals module on the homepage that is more obvious than the previous button located just below the flight search bar.

2. Testing a new recommendations module that will recommend only international destinations for visitors in the variation labeled 'TREATMENT' as opposed to the default option that recommends destinations both international and North American.

The first test will be behind an Optimizely feature flag and will be testing the feature, itself, as well as the CTA at the top of the feature. A visitor's variation will determine whether or not the feature is displayed at all as well as the CTA that is rendered on the page.

The second test will be a simple A/B test that splits traffic to either the default recommnedations module or the modified one that only displays international locations.

## Features Used

### flight_deals

This feature is wrapped around the flight deals module that will be displayed on the Pacific Airlines homepage. If turned off, the module will not display and, instead, the visitor will be shown the default experience which is a simple button below the search bar on the homepage. There is one feature variable called `title` of data type `string`. This feature variable will take the place of the hardcoded CTA at the top of the flight deals module. The feature, itself, is not restricted to any specific audiences.

Flight Deals Feature:

![Alt text](https://github.com/dshaps10/airline-fs-demo/blob/master/feature%20screenshot.png)

## Experiments Run

### flight_deals_test

In this test we're testing different configurations of the `flight_deals` feature. Visitors bucketed into `variation_1` will see the default experience of the simple button linking to the flight deals page; visitors bucketed into `variation_2` will see the new flight_deals feature with the CTA text: "Our Available Flight Deals"; visitors bucketed into `variation_3` will also see the new flight_deals feature, but with the modified CTA: "Check Out These Flight Deals". The CTA text will be changed using the `title` feature variable as part of the `flight_deals` feature.

Flight Deals Test Summary:

![Alt text](https://github.com/dshaps10/airline-fs-demo/blob/master/feature%20test%20summary.png)

Flight Deals Test Traffic Allocation:

![Alt text](https://github.com/dshaps10/airline-fs-demo/blob/master/feature%20test%20traffic%20allocation.png)