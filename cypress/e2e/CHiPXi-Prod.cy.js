import Login from "../LoginMethod/login.js";
import Locators from "../LocatorsMethod/locators.js";

describe('CHI PXi Prod', function() {

  it.skip('Validating Loyalty Program, Points and FAQ', function(){
        cy.VisitChonghuaSite()
        const ln=new Login();
        ln.SetUserName("ronniel2016")
        ln.SetPassword("L0m0cs0@20")
        ln.clickSubmit();
        cy.wait(5000)
        cy.LoyaltyPoints()
        cy.LoyaltyInformation()
        cy.EarnMorePoints()

  })

  it.skip('Validating CHH Doctors and Filters', function() 
    {
        cy.VisitChonghuaSite()
        const ln=new Login();
        ln.SetUserName("ronniel2016")
        ln.SetPassword("L0m0cs0@20")
        ln.clickSubmit();
        cy.wait(2000)
        cy.OurDoctors()
        cy.MandaueCityBuilding()
        cy.Schedule()
        cy.Filter()
    })

    it.skip('Validating Our Rooms and filter method', function() //Checking Filters, Rooms for Cebu and Mandaue
    {
        cy.VisitChonghuaSite()
        const ln=new Login();
        ln.SetUserName("ronniel2016")
        ln.SetPassword("L0m0cs0@20")
        ln.clickSubmit();
        cy.wait(2000)
        cy.RoomFilter()
        cy.PremiereSuite()
        cy.FilterCebuSite()
        cy.FilterMandaue()
        
    })  

    it.skip('Validating Accredited HMOs & Insurance and filter method', function() 
  {
        cy.VisitChonghuaSite()
        const ln=new Login();
        ln.SetUserName("ronniel2016")
        ln.SetPassword("L0m0cs0@20")
        ln.clickSubmit();
        cy.wait(2000)
        cy.AccreditedHMOs()
        cy.SearchInsurance()
  })

  it.skip('Self Service-Over the Counter Method', function()
{
        cy.VisitChonghuaSite()
        const ln=new Login();
        ln.SetUserName("ronniel2016")
        ln.SetPassword("L0m0cs0@20")
        ln.clickSubmit();
        cy.wait(2000)
        cy.SelfServicePharmacy()
}
)

  it('Validating Diagnostics and Services',function()
  {
        cy.VisitChonghuaSite()
        const ln=new Login();
        ln.SetUserName("ronniel2016")
        ln.SetPassword("L0m0cs0@20")
        ln.clickSubmit();
        cy.wait(2000)
        cy.DiagnosticsServicesWalkIn()
  })
})
