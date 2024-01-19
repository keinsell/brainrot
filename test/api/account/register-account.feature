Feature:
  
  Background:
	* def password = 'Supe123123990'
	* def username = 'testuser'
	* def email = 'testuser@test.com'
  
  Scenario: Register account successfully
	Given path '/account'
	And request { "username": "#(username)", "password": "#(password)","email":"#(email)" }
	When method post
	Then status 201
	And match response contains { id: '#notnull' }
	And match response.email == "#(email)"
	And match response.username == "#(username)"
	And match response.emailVerified == false
  
  Scenario: Should not register account with existing username
	Given path '/account'
	And request { "username": "#(username)", "password": "#(password)","email":"thisemailnotexist@example.com" }
	When method post
	Then status 409
	And match response contains { error: 'Conflict' }
	And match response contains { statusCode: 409 }
	And match response contains { message: "Username is already in use in system, try logging in instead." }
  
  Scenario: Should not register account with existing email
	Given path '/account'
	And request { "username": "theonewhotookemail", "password": "#(password)","email":"#(email)" }
	When method post
	Then status 409
	And match response contains { error: 'Conflict' }
	And match response contains { statusCode: 409 }
	And match response contains { message: "Email is already in use in system, try logging in instead." }
  
  Scenario: Should not register account with invalid email
	Given path '/account'
	And request { "username": "invalidemailu", "password": "#(password)","email":"asdafsgdsg" }
	When method post
	Then status 400
	And match response contains { error: 'Bad Request' }
	And match response contains { statusCode: 400 }
	And match response contains { message: "Invalid email address" }
  
  Scenario: Should not register account with invalid username
	Given path '/account'
	And request { "username": "asdkljaskji;i$", "password": "#(password)","email":"#(email)" }
	When method post
	Then status 400
	And match response contains { error: 'Bad Request' }
	And match response contains { statusCode: 400 }
	And match response contains { message: "Invalid username" }
  
  Scenario: Should not register account with weak password
	Given path '/account'
	And request { "username": "weakpassworduser", "password": "test","email":"weakpassworduser@test.com" }
	When method post
	Then status 400
	And match response contains { error: 'Bad Request' }
	And match response contains { statusCode: 400 }
	And match response contains { message: "Password is insecure enough." }
  
  
#  Scenario: Should send email verification
#	Given path '/account'
#	And request { "username": "1#(username)", "password": "#(password)","email":"#(email)" }
#	When method post
#	Then status 409