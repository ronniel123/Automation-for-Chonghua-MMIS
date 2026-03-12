import Login from "../LoginMethod/login.js";
import Locators from "../LocatorsMethod/locators.js";

describe('MMIS', function() {

  it('MMISBillingManagement', function() 
    {
        cy.VisitMMIS()
        cy.LoginAccount()
        cy.SearchPatient()
        cy.MergePatient()
    })  
})