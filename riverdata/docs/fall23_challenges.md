Some ideas for River Data development on React Native for Fall '23.

# Pre-requisites

Here are some things you should be able to do and understand before getting too deep into development.

1. Be able to checkout this reporistory and run web and a mobile target on the `develop` branch. Preferably using VS Code.
1. Be able to switch and creat git branches.
1. Pull Requests: Be able to create a pull request, review a pull request (including requesting changes), merging, and squashing.
1. Make sure you have access to the Trello board. Be sure to create tickets for any work you are doing that results in a pull request.

## Github repository requirements

1. `develop` and `main` branches should have be protected branches. This mean that it takes one review approval to merge. The `develop` branch is where everyone should be developing from and the `main` branch is for official relases.
1. Make sure secrets push protection is enabled. Never check in any secrets (creditnials, private keys). When in doubht, ask!
1. Recommendation: Make pull requests auto-assigned to team members round robin. This was everyone will get equal opportunities to review other pull requests.

# Challenges

Here's some ideas on some challenges that can be accomplished. They are put in S/M/L to give and idea of the possible complexity.

## Small

* Review the README.md file at the root and make pull requests to fix any problems or improve the out-of-box development.
* Make a build target for VS Code to for `npm run android`
* Make an app icon for each of the targets (web, android, ios)

## Medium

* Update favoriting a site by tapping a site on site gauges page itself. Currently, in order to favorite a site you need to swipe a gauge to reveal a heart icon, which is not very intuitive.
* Get the graphing working on web using `Platform.OS`` conditionals
* Get the native app build running on your own device (either android or ios)
* Get the Android app build working on [Appetize.io](https://appetize.io/). Appetize is a great way to run your native app build in an emulator.
* Get breakpoints working. There needs to be some investigation why breakpoints don't get enabled in VS Code when debugging. 

## Large

* Review the difference between the Expo and React Native CLI builds. Expo bundles up all your build steps and give you cloud build, so may be a simpler option. The ultimate result will be to have a way to build and deploy build artifacts. Note that iOS does require a developer account, so Andriod and web would be good initial options.
* Deploy the Andoird app to Google Play (we will need to create an account)
* Deploy the Web build to cloud. There are a few options in [Expo Publish Websites](https://docs.expo.dev/distribution/publishing-websites/). Docker may be an approach as well.
* Build a native charting timeseries view for gauge data. Here's an example of a JSON call: https://waterservices.usgs.gov/nwis/iv/?sites=08169000&agencyCd=USGS&parameterCd=00060&period=P30D&siteStatus=all&format=json. Here's the live chart: https://waterdata.usgs.gov/monitoring-location/08155300/#parameterCode=00065&period=P30D&showMedian=true&timeSeriesId=141262
* Get the cluster map working dynamically for each state. The pins should be navigable to the site.