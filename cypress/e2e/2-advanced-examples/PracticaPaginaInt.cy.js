/// <reference types="Cypress"/>


describe('Segundo conjunto de casos de pruebas avanzadas',function(){
    before(function(){
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('example').then(function(datos){
            this.datos=datos
        })
    })
    
    beforeEach(()=>{
        //ingresamos a la pagina de formulario
        cy.visit('https://mechanicalkeyboards.com/shop/')
    })

    it('Seleccionamos el producto que buscamos desde la pagina principal de shop',function(){
        cy.get(':nth-child(1) > .product-box > .imagebox > form > .box-image > .owl-stage-outer > .owl-stage > .active > li > a > .ebj_limit_img_height').click({waitForAnimations: true})
        cy.log('Logramos entrar a la pagina del producto')
        cy.get(':nth-child(1) > td[style="width: 99%;"] > .white').should('be.visible').select(this.datos.dropdown[0])
        cy.log('Logramos seleccionar un elemento del dropdown')
        cy.get(':nth-child(2) > td[style="width: 99%;"] > .white').should('be.visible').select(this.datos.dropdown[1])
        cy.log('Logramos seleccionar un elemento del dropdown siguiente')
        cy.get('#ebj_add_cart_btn > a').click()
        cy.log('Agregamos todo al carrito')

        //Pasamos al checkout y procedemos a abrir el dropdown para estimar la entrega del pedido

        cy.get(':nth-child(3) > .accordion-heading').click()
        cy.get('#shipping > input').click()
        cy.get('#shipping > input').type(this.datos.tiempoespera)
    })


    /*
    it('Seleccionamos desde los dropdowns los tipos de switches del teclado y añadimos al carrito',function(){
        cy.get(':nth-child(1) > td[style="width: 99%;"] > .white').click({waitForAnimations: true})
        cy.get(':nth-child(1) > td[style="width: 99%;"] > .white').should('be.visible').select(this.datos.dropdown[0])
        cy.get(':nth-child(2) > td[style="width: 99%;"] > .white').click({waitForAnimations: true})
        cy.get(':nth-child(2) > td[style="width: 99%;"] > .white').should('be.visible').select(this.datos.dropdown[1])
    })
    */

})

Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})
