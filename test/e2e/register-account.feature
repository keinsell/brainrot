Feature:
  
  Background:
    * url 'https://2qp6rukn8c1q.share.zrok.io/'
    * def fakerObj =  new faker()
    * def fName = fakerObj.name().firstName()
    * def lName = fakerObj.name().lastName()
    * def mailId = fName+'.'+lName+'@test.com'
    * def username = fakerObj.internet().username()
    
  Scenario: Register account successfully
    Given path '/account'
    And request { "username": "#(username)", "password": "#(password)","email":"#(email)" }
    When method post
    Then status 201
    And match response contains { id: '#notnull' }
    And match response.email == "#(mailId)"
    And match response.username == "#(username)"
    And match response.emailVerified == false
