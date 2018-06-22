/**
 * text-editor-no-html directive
 * Renders an element with parsed ngModel
 * @author Blanca López<blanca.lopez@data4.mx>
 * @since Dec 15, 2017
 */
(function () {
	'use strict';

	angular
		.module('pkg-text-editor')
		.directive('textEditorNoHtml', textEditorNoHtml);

	/** @ngInject */
	function textEditorNoHtml($sce) {
		return {
			restrict: 'E',
			templateUrl: 'app/pkg-text-editor/text-editor/text-editor-no-html.html',
			link: linkFunction,
			require: 'ngModel',
			scope: {
				ngModel: '='
			}
		};

		function linkFunction(scope, element, attrs, ngModel) {
			if (angular.isUndefined(ngModel)) {
				angular.element(element[0]).find('text-editor-no-html').html('');
				return;
			}

			ngModel.$formatters.push(function (modelValue) {
				return modelValue;
			});

			ngModel.$parsers.push(function (viewValue) {
				var trusted = $sce.getTrustedHtml(viewValue);
				return trusted.split('[').join('&#91;').split(']').join('&#93;').split('<').join('[').split('>').join(']');
			});

			scope.$watch('htmlToRender', function () {
				ngModel.$setViewValue(scope.htmlToRender);
			});

			ngModel.$render = function () {
				scope.htmlToRender = scope.unparseModel(ngModel.$viewValue);
			};

			scope.updateModel = function () {
				// GET HTML CONTENT BECAUSE NGMODEL IS NOT WORKING PROPERLY ON ANGULAR-TRIXs
				scope.htmlToRender = angular.element(element[0]).find('trix-editor').html();
				ngModel.$setViewValue(scope.htmlToRender);
			}
			scope.unparseModel = function (modelValue) {
				var res = modelValue;
				if (modelValue && modelValue.length > 1) {
					res = modelValue.split('[').join('<').split(']').join('>');
				}
				res = $sce.getTrustedHtml(res);
				angular.element(element[0]).find('trix-editor').html(res);
				return res;
			}
		}
	}
})();
