/** 
 * text-render test
 * @author Blanca López<blanca.lopez@data4.mx>
 * @since Dec 15, 2017
 */
describe('Unit testing text render', function () {
  var $compile,
    $rootScope;

  // Load the pkg-text-editor module, which contains the directive
  beforeEach(module('pkg-text-editor'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function () {
    // Compile a piece of HTML containing the directive
    $rootScope.comment = '[strong]hi![/strong]';
    var element = $compile("<text-render ng-model='comment'></text-render>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("ng-bind-html");
    expect(element.html()).toContain("<strong>hi!</strong>");
  });
});