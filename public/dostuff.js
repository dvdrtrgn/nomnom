define([''], function () {
  var W = window;
  var C = W.console;

  return function dostuff() {
    C.log('DOSTUFF: pub');
    C.log('baseUrl', require.toUrl(''));
  };
});
