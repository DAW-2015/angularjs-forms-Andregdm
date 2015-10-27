var app = angular.module('formExample', []);

app.directive('cpfVal', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.cpfVal = function(modelValue, viewValue) {
                // código de validação
                if (ctrl.$isEmpty(modelValue)) {
                    return false;
                } else {
                    cpf = viewValue.replace(/[^\d]+/g,'');
                    if(cpf == '') return false;
                    if (cpf.length == 10) {
                        cpf = "0" + cpf;
                    }
                    // Elimina CPFs invalidos conhecidos
                    if (cpf.length != 11 ||
                        cpf == "00000000000" ||
                        cpf == "11111111111" ||
                        cpf == "22222222222" ||
                        cpf == "33333333333" ||
                        cpf == "44444444444" ||
                        cpf == "55555555555" ||
                        cpf == "66666666666" ||
                        cpf == "77777777777" ||
                        cpf == "88888888888" ||
                        cpf == "99999999999")
                            return false;
                    // Valida 1o digito
                    add = 0;
                    for (i=0; i < 9; i ++)
                        add += parseInt(cpf.charAt(i)) * (10 - i);
                        rev = 11 - (add % 11);
                        if (rev == 10 || rev == 11)
                            rev = 0;
                        if (rev != parseInt(cpf.charAt(9)))
                            return false;
                    // Valida 2o digito
                    add = 0;
                    for (i = 0; i < 10; i ++)
                        add += parseInt(cpf.charAt(i)) * (11 - i);
                    rev = 11 - (add % 11);
                    if (rev == 10 || rev == 11)
                        rev = 0;
                    if (rev != parseInt(cpf.charAt(10)))
                        return false;
                    return true;
                }
            }
        }
    };
});

app.directive('telVal', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.telVal = function(modelValue, viewValue) {
                // código de validação
                if (ctrl.$isEmpty(modelValue)) {
                    return false;
                } else {
                    if (viewValue.length == 11 || viewValue.length == 10) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    };
});

app.controller('ExampleController', ['$scope', function($scope) {
    this.master = {};

    this.update = function(user) {
      this.master = angular.copy(user);
    };

    this.reset = function() {
      $scope.user = {};
    };

    this.reset();
  }])

app.filter('filtroCPF', function() {
    return function (text) {
    var cpf = text.toString();
    sal = cpf.split("");
    if (sal.length < 11) {
        cpf = "0" + text.toString();
        sal = cpf.split("");
    }
    var cpf1 = sal[0] + sal[1] + sal[2];
    var cpf2 = sal[3] + sal[4] + sal[5];
    var cpf3 = sal[6] + sal[7] + sal[8];
    var cpf4 = sal[9] + sal[10];
    cpf = cpf1 + "." + cpf2 + "." + cpf3 + "-" + cpf4;
    return cpf;
    }
});

app.filter('telefone', function() {
    return function (text) {
    var tel = text.toString();
    sal = tel.split("");
    var ddd = sal[0] + sal[1];
    var p1 = sal[2] + sal[3] + sal[4] + sal[5];
    var p2 = sal[6] + sal[7] + sal[8] + sal[9];
    tel = "(" + ddd + ") " + p1 + "-" + p2;
    return tel;
    }
});

app.filter('toReal', function() {
    return function (text) {
    var sal = text.toString();
    sal = sal.replace(",", "%");
    sal = sal.replace(".", ", ");
    sal = sal.replace("%", ".");
    return sal;
    }
});

app.controller('FuncionariosController', function() {

  this.employees = [
    {
      name: "João",
      cpf: 11122233344,
      email: "joao@j.com",
      phone: 3132453499,
      salary: 100000
    },
    {
      name: "Pedro",
      cpf: 12312345699,
      email: "pedro@p.com",
      phone: 2731458976,
      salary: 8600
    },
    {
      name: "Paula",
      cpf: 12300012311,
      email: "paula@p.com",
      phone: 4134568900,
      salary: 4550
    },
    {
      name: "Ana",
      cpf: 08007611134,
      email: "ana@a.com",
      phone: 2125366556,
      salary: 5500
    },
    {
      name: "Gustavo",
      cpf: 22244466688,
      email: "Gustavo Augusto",
      phone: 1125268441,
      salary: 15000
    },
    {
      name: "Marques",
      cpf: 45465689812,
      email: "marques@m.com",
      phone: 8899009900,
      salary: 56000
    },
    {
      name: "Matheus",
      cpf: 07689155189,
      email: "matheus@m.com",
      phone: 5789550046,
      salary: 3700
    },
    {
      name: "Clara",
      cpf: 06587921125,
      email: "mariaclara@maria.com",
      phone: 3125168998,
      salary: 5800
    },
    {
      name: "Claudio",
      cpf: 45378699900,
      email: "claudio@claudio.com",
      phone: 1225651398,
      salary: 1500
    }
  ];

});
