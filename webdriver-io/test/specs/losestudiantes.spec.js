var assert = require('assert');
describe('los estudiantes login', function() {
    var originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        browser.deleteCookie('user');
        browser.deleteCookie('AWSELB');
        browser.deleteCookie('__cfduid');
        browser.deleteCookie('_ga');
        browser.deleteCookie('_gat');
        browser.deleteCookie('_gid');
        browser.url('https://losestudiantes.co');
    });

    it('should visit los estudiantes and failed at log in', function () {
        browser.click('button=Cerrar');
        browser.waitForVisible('button=Ingresar', 5000);
        browser.click('button=Ingresar');
        var cajaLogIn = browser.element('.cajaLogIn');
        var mailInput = cajaLogIn.element('input[name="correo"]');

        mailInput.click();
        mailInput.keys('wrongemail@example.com');

        var passwordInput = cajaLogIn.element('input[name="password"]');

        passwordInput.click();
        passwordInput.keys('1234');

        cajaLogIn.element('button=Ingresar').click();
        browser.waitForVisible('.aviso.alert.alert-danger', 5000);

        var alertText = browser.element('.aviso.alert.alert-danger').getText();
        expect(alertText).toBe('Upss! El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.');
    });

    it('should login with existing account', function() {
      browser.waitForVisible('button=Ingresar', 5000);
      browser.click('button=Ingresar');
      var cajaLogIn = browser.element('.cajaLogIn');
      var mailInput = cajaLogIn.element('input[name="correo"]');

      mailInput.click();
      mailInput.keys('jd.fandino10@uniandes.edu.co');

      var passwordInput = cajaLogIn.element('input[name="password"]');

      passwordInput.click();
      passwordInput.keys('asdfzxcv');

      cajaLogIn.element('button=Ingresar').click();
      browser.waitForVisible('.usrImage', 5000);
    });


    it('Can\'t create account with existing login', function() {
      browser.waitForVisible('button=Ingresar', 5000);
      browser.click('button=Ingresar');
      var cajaSignUp = browser.element('.cajaSignUp');
      var nameInput = cajaSignUp.element('input[name="nombre"]');
      nameInput.click();
      nameInput.keys('Jose');
      var lastNameInput = cajaSignUp.element('input[name="apellido"]');
      lastNameInput.click();
      lastNameInput.keys('Fandiño');
      var mailInput = cajaSignUp.element('input[name="correo"]');
      mailInput.click();
      mailInput.keys('jd.fandino10@uniandes.edu.co');
      var passwordInput = cajaSignUp.element('input[name="password"]');
      passwordInput.click();
      passwordInput.keys('asdfzxcv');
      cajaSignUp.element('select[name="idPrograma"]').selectByValue('22');
      cajaSignUp.element('input[name="acepta"]').click();
      cajaSignUp.element('button=Registrarse').click();
      browser.waitForVisible('.sweet-alert h2', 5000);
      var alertText = browser.element('.sweet-alert h2').getText();
      expect(alertText).toBe('Ocurrió un error activando tu cuenta');
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
