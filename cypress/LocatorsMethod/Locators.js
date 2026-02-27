class Locators
{
    OurDoctor="//div[contains(text(),'Our Doctors')]";
    SearchDoctor='//input[@id="searchInput"]';

    OurDoctors()
    {
        cy.get(this.OurDoctor).click()
    }
    SearchDoctors(search)
    {
        cy.get(this.SearchDoctor).type(search)
    }
}

export default Locators;