<?php

use Drupal\DrupalExtension\Context\MinkContext;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\Behat\Tester\Exception\PendingException;

class FeatureContext extends MinkContext implements SnippetAcceptingContext {

  /**
   * @Given I am an anonymous user
   */
  public function iAmAnAnonymousUser() {
    // Just let this pass-through, it's there for semantic reasons.
  }

  /**
   * @Then I should see at least :count :type
   */
  public function iShouldSeeAtLeast($type, $count) {
    if ($count == '-') {
      // No data is required (e.g. the user doesn't have favorites)
      return;
    }
    
    $locator = ".ProfileNav-list .ProfileNav-item--$type .ProfileNav-value";

    // Get the value from the page.
    $page = $this->getSession()->getPage();
    $text = $page->find('css', $locator)->getText();
    $text = intval(str_replace('views', '', $text));

    if ($text < $count) {
      throw new Exception(sprintf('Wrong count (showing %d instead of %d) for type %s', $text, $count, $type));
    }

  }

}
