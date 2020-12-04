# bluechain

The Challenge
A) Implement a demo web site
The purpose of this test is to
1) Create a web site that can connect to an API server,
2) Make a login request to retrieve an authentication token and
3) Build a form for an user to fill in all required information for an onboarding request
with simple validation (e.g. dates should be valid dates)
4) Use the token to submit that onboarding request to our API
The API server is https://webapi.demo.bluechain.com/v1/
You can test connectivity to the service via a GET request to
https://webapi.demo.bluechain.com/v1/pingServer
B) Login token
The login token request is POST https://webapi.demo.bluechain.com/v1/OAuth2/token.
This request accepts content-type of application/x-www-form-urlencoded, with the
fields username and password.
Username = TestUserDemo
Password = @Password_1234
Client_ID = c.user.password
Grant_type = password
Calls to this method will return a standard OAuth2 token response in JSON format:
{
"access_token": "XXX",
"expires_in": 2592000,
"token_type": "Bearer",
"refresh_token": "XXX"
}
The access_token field will contain the token to use for the call to perform the
onboarding, the value should go in the Authorization header (after the Bearer prefix).
C) Onboard Customer (Business & Owner)
The customer data request should be sent as a POST request to
https://webapi.demo.bluechain.com/v1/onboard
This request accepts at application/json payload (content-type must be specified)
with the following structure:

Bluechain Pty Ltd
Suite 2, Level 1, 313 Burwood Rd
Hawthorn, Vic 3122

requestKey string($uuid)

[mandatory] Required UUID to uniquely identify request

person
mobile string

[mandatory] This is the person’s international formatted
phone number
email string

[optional] This is the email of the person to on-board.

fullName String

[conditional] This is the full name of the person to
on-board. Must have at least one space, and either this
field or both familyName and givenName must be supplied

familyName string

[conditional] This is the family name of the person to
on-board. Required if fullName not specified.

givenName string

[conditional] This is the given name of the person to
on-board. Required if fullName not specified.

middleName string

[optional] This is the middle name of the person to
on-board
countryOfResidenceCode string

[conditional] ISO 3166-1 two letter code for country of
residence of the person to on-board. Required if
countryCode not specified in addressDetails.

dateOfBirth string($date-time)

[mandatory] This is the date of birth of the person
to on-board, as yyyy-mm-dd

addressDetails {...}

[optional] (subfields address, state, postcode,
countryCode etc)

paymentAlias string

[optional] This is the customer payment alias associated
with the profile. If not supplied one will be
automatically generated.

business
phoneNumber string

[mandatory] This is the business’s international formatted
phone number
legalName string

[mandatory] This is the legal business name to on-board.

businessName string

[optional] This is the display/trading as/doing-business-as name,

Bluechain Pty Ltd
Suite 2, Level 1, 313 Burwood Rd
Hawthorn, Vic 3122

if different to above

email string

[optional] This is the email address of the business to on-board.

businessNumber string

[mandatory] This is the business/tax identification number
(ABN, EIN, VAT ID etc.) to on-board

defaultCurrency string

[optional] This is the default currency the business uses for
payment requests

defaultTaxSystem string

[optional] This is the default tax system the business uses for
payment requests

merchantCategoryCode string

[mandatory] The business’s ISO 18245 4-digit merchant category code

paymentAlias string

[optional] This is the unique merchant payment alias associated
With the profile. Auto-generated if not supplied.

url string

[optional] This is the URL of the business’s primary website

addressDetails {...}

[mandatory] Business address details.
Required subfields are:
address Building/unit/house number & street name
countryCode As per ISO 3166-1
Optional fields include locality, state, postcode, poBox.

defaultLanguageCode string

[optional] ISO-639 language code (e.g. en-us) for the business

For more information, you can refer to: https://webapi.demo.bluechain.com/swagger/index.html
An example (JSON) would be:
{
"person": {
"mobile": "+61429998887",
"email": "someone@email.com",
"fullName": "Some One",
"countryOfResidenceCode": "AU",
"dateOfBirth": "2000-09-24",
},
"business": {
"phoneNumber": "+61429998887",
"legalName": "My Business",
"email": "hello@mybusiness.com",
"businessNumber": "A212829",
"merchantCategoryCode": "5399",
"url": "https://mybusiness.com",
"addressDetails": {
"address": "1 Main St",
"locality": "Springfield",
"postcode": "9999",
"countryCode": "AU",
},
"defaultLanguageCode": "en-AU",
},
"requestKey": "9DC9D22D-FE5A-499E-886F-81327EE0234C"
}

Bluechain Pty Ltd
Suite 2, Level 1, 313 Burwood Rd
Hawthorn, Vic 3122

Any errors should be shown to the user, they will be returned as an array, each entry in the
form:
{
"requestedUri": "string",
"requestKey": "string",
"errorCode": "string",
"errorMessage": "string"
}
If there is an error relating to particular field, it will be referred to in the errorMessage.

If the API call succeeds it will return something like
{
"requestKey": "9DC9D22D-FE5A-499E-886F-81327EE0234C",
"person": {
"bcProfileIdentifier": "PAU243825028"
},
"business": {
"bcProfileIdentifier": "BAU0586275411"
}
}
Using which you should provide appropriate feedback to the user.