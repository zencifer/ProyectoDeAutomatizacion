/// <reference types="Cypress"/>

//Suite de casos de prueba avanzados
describe('Segundo conjunto de casos de pruebas avanzadas',function(){
    before(function(){
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('example').then(function(datos){
            this.datos=datos
        })
    })
    beforeEach(()=>{
        //ingresamos a la pagina de formulario
        cy.visit('https://demoqa.com/automation-practice-form')
    })

    it('Llenamos nuestro primer formulario utiizando data',function(){
        cy.get('#firstName').type(this.datos.nombre)
        cy.get('#lastName').type(this.datos.apellido)
        cy.get('#userEmail').type(this.datos.email)
        cy.get('input[name="gender"][value='+this.datos.sexo+']').check({force:true}).should('be.checked')
        cy.get('#userNumber').type(this.datos.telefono)
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').should('be.visible').select(this.datos.fechaDeNacimiento[0])
        cy.get('.react-datepicker__year-select').should('be.visible').select(this.datos.fechaDeNacimiento[1])
        cy.get('.react-datepicker__day--0'+this.datos.fechaDeNacimiento[2]).click()
        cy.get('#dateOfBirthInput')
            .should('contain.value',this.datos.fechaDeNacimiento[0].substring(0,3))
            .should('contain.value',this.datos.fechaDeNacimiento[1])
            .should('contain.value',this.datos.fechaDeNacimiento[2])
            
        cy.get('.subjects-auto-complete__value-container').type(this.datos.materia)
        cy.get('div[id^="react-select-"]').click()

        cy.get('.subjects-auto-complete__value-container').type('Maths')
        cy.get('div[id^="react-select-"]').click()

        cy.get('.subjects-auto-complete__value-container').should('contain.text',this.datos.materia)

        cy.get('<input type="checkbox" id="hobbies-checkbox-1" class="custom-control-input" value="1">').should({force:true}).should('be.checked')
    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})