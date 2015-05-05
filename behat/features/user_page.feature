Feature: User page
  In order to be able to view a user's activity
  As an anonymous user
  We need to be able to have access to the user's page

  @api
  Scenario Outline: Assert user's stats appear
    Given I am an anonymous user
    When  I visit "<url>"
    Then  I should see at least "<tweets>" "tweets"
    And   I should see at least "<following>" "following"
    And   I should see at least "<followers>" "followers"
    And   I should see at least "<favorites>" "favorites"

  Examples:
    | url          | tweets | following | followers | favorites |
    | gizra_drupal | 340    | 55        | 150       | 1         |
    | amitaibu     | 960    | 40        | 550       | -         |


