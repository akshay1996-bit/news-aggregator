# news-aggregator-backend

This repo contains backend code for API of news aggregator

User needs to register with name,a unique email, password and preferences using POST /register API.

After signup, user needs to login with the provided email and password (POST /login)

After login a JWT token is returned to the user, user needs to pass this token in authorization header in the format 'JWT token', for further APIs.

User can use API GET /news, which returns the news according to the preferences provided by the user.

User can further fetch and update the preferences by using the GET /preferences and /PUT preferences API.
