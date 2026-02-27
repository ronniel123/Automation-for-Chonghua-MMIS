//MMIS APPLICATION
Cypress.Commands.add('VisitMMIS', () => {
  cy.reload(true)
  cy.intercept('GET', '/api/**').as('apiCall')
  cy.getCookies().then((cookies) => {
    cy.log(cookies)
  })
  cy.clearLocalStorage()
  cy.visit('https://dev-mmis.chonghuamedicalmall.com.ph',{
      onBeforeLoad(win) {
      delete win.navigator.__proto__.serviceWorker
  }}) // Disable service worker
  cy.wait(9000)
  cy.screenshot('//*[@id="app"]/div[3]/div/div/div[2]')
  })

  Cypress.Commands.add('LoginAccount', () => {
  cy.xpath("//input[@type='text']")
    .should('be.visible')
    .clear()
    .type('JHURANO', { delay: 100 })  //Another Username: shanadmin, sibimark, JHURANO, JTARNATE

  cy.xpath("//input[@type='password']")
    .clear()
    .type('Mmis@2024', { delay: 100 }) //Another Password: Mmis@1234. , Chh@12345 , Mmis@2024, Admin@1234.
  cy.xpath("//span[@class='mud-button-label']").click() //click login
  cy.url().should('not.include', 'login')
  cy.wait(9000)
  cy.screenshot('//*[@id="app"]/div[3]/div/div') //Dashboard screenshot
})

Cypress.Commands.add('SearchPatient', () => {
  cy.wait(1000)
  cy.xpath('//*[@id="app"]/div[3]/aside/div/div[2]/div[2]/div/div/div/div/div[1]/a/div').click()
  cy.wait(3000)
  cy.xpath("//div[contains(text(),'Search Patient')]")
  cy.screenshot('//*[@id="app"]/div[3]/div/div') // Search Patient Info
  cy.xpath('//*[@id="app"]/div[3]/div/div/a/span').should('have.text','Add New Patient').screenshot('//*[@id="app"]/div[3]/div/div/a')
  cy.contains('h6','Search Patient').should('be.visible').screenshot('//*[@id="app"]/div[3]/div/div/div[1]/h6')
  cy.wait(2000)
  cy.xpath('//*[@id="app"]/div[3]/div/div/div[1]/form/div/div[1]/div/div/div/input').type('Lomocso, Ronniel').screenshot('//*[@id="app"]/div[3]/div/div/div[1]/form/div/div[1]')
  cy.xpath('//*[@id="app"]/div[3]/div/div/div[1]/form/div/div[3]/button/span').click()
  cy.wait(5000).screenshot('//*[@id="app"]/div[3]/div/div/div[2]') //Screenshot on the Patient List
  cy.xpath('//*[@id="app"]/div[3]/div/div/div[2]/div/div[1]/table/thead/tr/th[2]/div').should('have.text','PATIENT NO')
    .then(($el) => {
      if ($el.length > 0) {
        // Data exists → take screenshot
        cy.screenshot('//*[@id="app"]/div[3]/div/div/div[2]/div/div[1]/table/tbody/tr/td[2]')
      } else {
        // No data → skip
        cy.log('No data found, screenshot skipped')
      }
    })
    cy.xpath('//*[@id="app"]/div[3]/div/div/div[2]/div/div[1]/table/thead/tr/th[8]/div').should('have.text','ADDRESS')
      .then(($el) => {
      if ($el.length > 0) {
        // Data exists → take screenshot
        cy.screenshot('//*[@id="app"]/div[3]/div/div/div[2]/div/div[1]/table/tbody/tr/td[8]')
      } else {
        // No data → skip
        cy.log('No data found, screenshot skipped')
      }
    })

})

Cypress.Commands.add('BillingManagement', function(){
  cy.wait(1000)
  cy.contains('span','Billing Management')
    .should('have.text','Billing Management')
    .click().wait(2000)
    .screenshot('//*[@id="app"]/div[3]/div/div')
    .wait(2000)
  cy.xpath("//input[@placeholder='Account No']").clear().type('OPDZ00009898', { delay: 100 }).type('{enter}')
    .wait(5000)
  cy.contains('span','Credit Memo/Reversal').click()
  cy.xpath("//div[@class='mud-nav-link-text'][normalize-space()='Adjustment']").click()
    .wait(2000)
  cy.xpath("//input[@placeholder='Patient No']").should('be.visible')
    .wait(2000)
  cy.xpath("//input[@placeholder='Select Department']").click( {force:true}).wait(2000).screenshot()
  cy.contains('p','Billing').should('be.visible').click( {force:true} )
  cy.xpath('//*[@id="_897493c9a0b146cc832c328a333708a5"]/div[2]/div[4]/div/form/div[3]/div[2]/div[1]/form/div/div[1]/div[1]/div/div/label').click()
  cy.contains('p','LOYALTY POINTS REDEEM').click()
  cy.xpath("//input[@placeholder='Reference No*']").click( {force:true}).wait(2000).screenshot()


})




































































// CHi APPLICATION
Cypress.Commands.add('VisitChonghuaSite', () => {
  cy.visit("https://chi.chonghua.com.ph/login")
  cy.screenshot("Website");
  })
  // Checking Loyalty Program
  Cypress.Commands.add('LoyaltyPoints', () => {   
  cy.xpath('//*[@id="__next"]/div[2]/main/div/div[2]/div[3]/main/div[1]/div/a/span[3]').click()
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[1]/div[1]/span').click()
  cy.wait(2000)
  })

  Cypress.Commands.add('LoyaltyInformation', () => {
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div[3]/div/div/h2').should('have.text','Loyalty Information')
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[3]/div/div/h2') //Loyalty Information modal screenshot
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div[3]/div/button').click()
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[1]')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[1]/button/span[1]').click()
  cy.wait(2000)
  cy.contains('button','1. What is CHi Care Plus?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[1]/button/span[1]')
  cy.wait(2000)
  cy.contains('button','2. How do I enroll?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[2]/div')
  cy.wait(2000)
  cy.contains('button','3. How can I check my points?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[3]/div')
  cy.contains('button','4. How soon are points credited?').click()
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[4]/div')
  cy.contains('button','6. Where can I earn points?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[6]/div')
  cy.wait(2000)
  cy.contains('button','7. How do I earn points?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[7]/div')
  cy.contains('button','8. Can I transfer my points to someone else?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[8]/div')
  cy.wait(2000)
  cy.contains('button','9. When can I start redeeming my points?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[9]/div')
  cy.wait(2000)
  cy.contains('button','10. Where can I redeem my points?').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[10]/div')
  cy.wait(2000)
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[1]/button').click() //Click X button to back
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div[4]/div[2]/div[2]/div[10]/div')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div[3]/div/div/button').click() //Click X button to back to Care Plus page
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div')
})

Cypress.Commands.add('EarnMorePoints', () => {   
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/a').click()
  cy.contains('button','Proceed').click()
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[2]/div/div[1]/div').click()
  cy.wait(4000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]')
})



//Check CHH Doctors and Filters
Cypress.Commands.add('OurDoctors', () => {
  cy.xpath('//div[contains(text(),"Our Doctors")]').click()
  cy.xpath('//input[@id="searchInput"]').type('Chua')
  cy.wait(3000)
  cy.xpath('//h5[normalize-space()="EDWARD A. CHUA, M.D."]').should('be.visible').click()
  cy.wait(2000)
  cy.xpath('//h6[normalize-space()="Clinic Schedule"]').should('have.text','Clinic Schedule')
  cy.xpath('//p[normalize-space()="Site"]').should('have.text','Site')
})
Cypress.Commands.add('MandaueCityBuilding', () => {
  cy.xpath('//p[normalize-space()="Chong Hua Hospital (Mandaue City)"]').should('have.text','Chong Hua Hospital (Mandaue City)')
  cy.xpath('//p[normalize-space()="Building"]').should('have.text','Building')
  cy.xpath('//p[normalize-space()="Chong Hua Medical Arts Building Mandaue"]').should('have.text','Chong Hua Medical Arts Building Mandaue')
})
Cypress.Commands.add('Schedule', () => {
  cy.xpath('//p[normalize-space()="Schedule"]').should('have.text','Schedule')
  cy.wait(2000)
  cy.get('button[aria-label="Go back"] div:nth-child(2)').click()
  cy.wait(2000)
})
Cypress.Commands.add('Filter', () => {
  cy.xpath('//img[@alt="Filter"]').click()
  cy.xpath('//div[@class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"]').screenshot('Filter')
  cy.xpath('//*[@id="specialization"]').click()
  cy.wait(3000)
  cy.contains('button','Mandaue').click({force:true})
  cy.wait(2000)
  cy.contains('button','Weekdays').click({force:true})
  cy.contains('button','Clear Filters').click()
  cy.wait(3000)
  cy.contains('button','Mandaue').click({force:true})
  cy.wait(2000)
  cy.contains('button','Weekdays').click({force:true})
  cy.contains('button','Apply Filters').click()
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[1]/div[2]')
})

  //Checking Rooms for Cebu and Mandaue
Cypress.Commands.add('RoomFilter', () => {
  cy.xpath('//*[@id="__next"]/div[2]/main/div/div[2]/div[3]/main/div[3]/div[1]/div/div[4]/div[1]/div').click()
  cy.xpath('//*[@id="searchInput"]').type('Ward')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[3]/div[2]').click()
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[1]/div/h5').should('have.text','Our Rooms').screenshot('Our Rooms')
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div/div/div[1]/img');
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/button/div[2]').click() //Click Back
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/button/div[2]')
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[3]/div[1]')
})
Cypress.Commands.add('PremiereSuite', () => {
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[3]/div[1]/div/div/h5').should('have.text','Premiere Suite')
  cy.wait(2000)
})
Cypress.Commands.add('FilterCebuSite', () => {
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[2]/div/div[2]').click()
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[3]/div[1]')
})
Cypress.Commands.add('FilterMandaue', () => {
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[2]/div/div[3]').click()
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]')
})

  //Checking available Accredited HMO & insurance and the search and filters
Cypress.Commands.add('AccreditedHMOs', () => {
  cy.xpath('//div[contains(text(),"Accredited HMOs & Insurance")]').click()
  cy.xpath('//h5[normalize-space()="Accredited HMOs & Insurance"]').should('have.text','Accredited HMOs & Insurance')
})
Cypress.Commands.add('SearchInsurance', () => {
  cy.get('#searchInput').type('Maxicare')
  cy.wait(2000)
  cy.xpath('//h5[normalize-space()="MAXICARE HEALTHCARE CORPORATION"]').should('have.text','MAXICARE HEALTHCARE CORPORATION').click()
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]')
  cy.wait(2000)
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/button/div[2]').click()
  cy.wait(2000)
  cy.get('#searchInput').type('Manulife Financial')
  cy.wait(1000)
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[2]/div').click() //Click Back
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]') //SS Manulife Financial Page
  cy.wait(2000)
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/button/div[2]').click()//Click to Accredited HMO
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/button/div[2]').click()//Click Back to Dashboard
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/main/div/div[2]/div[3]') //SS from Dashboard
})

  //Self-Services
Cypress.Commands.add('SelfServicePharmacy', () => {
  cy.xpath('//*[@id="__next"]/div[2]/main/div/div[1]/div[2]/div[2]/button/div').click()
  cy.wait(2000)
  cy.xpath("//div[contains(@class,'lg:hidden') and contains(@class,'fixed')]//p[normalize-space()='Self-Service']").should('be.visible').click() //Self Service
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div/div[2]/div/div[1]/div').click()
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div/div[2]/div/div[1]/div')
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[2]/div[3]/div[1]/div').click()
  cy.wait(5000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]')
  cy.contains('h5', 'Order Medications').should('be.visible')
  cy.xpath('//*[@id="searchInput"]').type('Essentiale')
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[3]/div')
  cy.xpath('//*[@id="searchInput"]').clear().type('advil')
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]')
  cy.contains('h5', 'IBUPROFEN').should('be.visible').click()
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div/img')
  cy.contains('button','Add to bag').click() //Click Add to bag
  cy.wait(2000)
  cy.contains('button','Okay').click()
  cy.wait(3000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div/img') //Screenshot for paracetamol medicine
  cy.xpath('//*[@id="radix-_r_10_"]/div[2]/div/button[1]/div/div[1]/p[1]').click()  //Select Location Cebu
  cy.contains('button','Continue').click()
  cy.contains('button','Add to bag').click() //Click Add to bag
  cy.xpath('//*[@id="__next"]/div[2]/div[1]/div[2]/div[1]/div[2]/div/img').click()
  cy.wait(5000)
  cy.xpath('//*[@id="RX0000002956"]').click() //Select checkbox
  cy.contains('button','Proceed to Checkout').click()
  cy.wait(5000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]')
  cy.contains('button','Submit Order').click()
  cy.wait(3000)
  cy.contains('h4','Order Submitted').should('be.visible')
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[2]/div/div[1]')
  cy.wait(1500)
})

//Diagnostics and Services
Cypress.Commands.add('DiagnosticsServicesWalkIn', () => {
  cy.contains('div','Diagnostics and Services').should('have.text','Diagnostics and Services').click()
  cy.wait(4000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]') //Screenshot on Diagnostics and Services
  cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[3]/div[3]').click() //Select Bloodbank
  cy.wait(2000)
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]') //Screenshot on Bloodbank Menu
  cy.contains('h6','BLOOD ANTIBODY SCREENING ASSAY').should('be.visible')
  cy.contains('div','Cebu').click({force:true})
  cy.wait(3000)
  cy.contains('p','Chong Hua Hospital (Cebu City)').should('be.visible')
  cy.contains('h6','BLOOD TYPING (A,B,O &RH)').should('be.visible')
  cy.screenshot('//*[@id="__next"]/div[2]/div[2]/div[3]/div/div/div[2]/div[5]/div[2]')
  cy.wait(2000)
})



Cypress.Commands.add('', () => {

})