module.exports = { // adapted from: https://git.io/vodU0
  beforeEach : function (browser) {
    browser.resizeWindow(1250, 1000);
  },
  'Los estudiantes login falied': function(browser) {
    browser
      .url('https://losestudiantes.co/')
      .click('.botonCerrar')
      .waitForElementVisible('.botonIngresar', 4000)
      .click('.botonIngresar')
      .setValue('.cajaLogIn input[name="correo"]', 'wrongemail@example.com')
      .setValue('.cajaLogIn input[name="password"]', '1234')
      .click('.cajaLogIn .logInButton')
      .waitForElementVisible('.aviso.alert.alert-danger', 4000)
      .assert.containsText('.aviso.alert.alert-danger', 'El correo y la contraseña que ingresaste no figuran')
      .end();
  },
  'Navigate to professor page': function(browser) {
    browser
      .url('https://losestudiantes.co')
      .click('.botonCerrar')
      .waitForElementVisible('.botonIngresar', 4000)
      .click('input[role="combobox"]')
      .setValue('input[role="combobox"]', 'mario linares')
      .waitForElementVisible('.Select-option', 4000)
      .click('.Select-option')
      .waitForElementVisible('.infoProfesor', 4000)
      .end();
  },
  'Filters coments by subject': function(browser) {
    browser
      .url('https://losestudiantes.co/universidad-de-los-andes/ingenieria-de-sistemas/profesores/mario-linares-vasquez')
      .waitForElementVisible('.statsProfesorDropdown', 4000)
      .click('input[name="id:ISIS1206"]')
      .pause(2000); // wait animation
    browser.expect.element('.sobreCalificacion').text.to.contain('Estructuras De Datos');
    browser.end();
  },
};
