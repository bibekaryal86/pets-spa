# pets-ui-layer

This app uses React/Redux/Typescript to provide a user interface. It uses fetch to call microservices, via gateway, to
retrieve/insert/modify/delete data, and present the same data to users.

This app is one of the five apps that form the PETS (Personal Expenses Tracking System) application:

* https://github.com/bibekaryal86/pets-database-layer
* https://github.com/bibekaryal86/pets-service-layer
* https://github.com/bibekaryal86/pets-authenticate-layer
* https://github.com/bibekaryal86/pets-gateway-layer
* https://github.com/bibekaryal86/pets-ui-layer (this)

The following are some things to make for better usability of the app:

* A page to import transactions (or any other data points)
    * A couple of ways to go about it:
        * Grab the csv data and pass it to `pets-service-layer` to process the data
        * Process the data in the app itself and use existing endpoints to insert data
* Add test coverage, which currently has been added to one module only
* React Styleguidist
* Reduce the amount of data while retrieving data (esp transactions)
    * This requires changes to at least `pets-service-layer` as well
    * Another idea -> instead of pagination, get transactions for a year at a time, with option to get data multi-year,
      but with a warning message that the process could be slowed down because of the volume of data
* Make the header menu fixed so that even when scrolling the header menu remains on top
* Something to display on the left nav sidebar
    * Maybe display accounts list in some sort of collapsible card to display summary of each open account
* Something to display on the home page
    * Some graphs and charts with current state and/or trends

This app is deployed in AWS Amplify. AWS Amplify makes it very easy to deploy React based app from its website by
connecting directly to GitHub. The only configuration required is the `amplify.yml` file in the project root - but this
is optional and needed only to override the build settings provided by default in the Amplify page.

* App Link: https://petsuispa.d2mc7j0q1ov90v.amplifyapp.com/
