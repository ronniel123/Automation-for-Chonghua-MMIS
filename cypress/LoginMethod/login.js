class Login
{
    txtUserName="#username";
    txtPassword="#password";
    btnSubmit="button[type='submit']";

    SetUserName(username)
    {
        cy.get(this.txtUserName).should('be.visible').type(username)
    }

    SetPassword(password)
    {
        cy.get(this.txtPassword).should('be.visible').type(password)
    }

    clickSubmit()
    {
        cy.get(this.btnSubmit).click()
    }
}

export default Login;