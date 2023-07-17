describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the login page", () => {
    cy.url().should("include", "/");
    cy.get("h1").should("contain", "Masuk");
  });

  it("should navigate to the dashboard page", () => {
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get("button").click();

    cy.url().should("include", "/dashboard");
    cy.get("h1").should("contain", "Dashboard");
  });

  it("should logout from the dashboard page", () => {
    cy.get("button").contains("Keluar").click();
    cy.url().should("include", "/");
    cy.get("h1").should("contain", "Masuk");
  });

  it("should validate the email", () => {
    cy.get('input[name="email"]').invoke("val").should("match", /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("should match the email and password with server", () => {
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("example2048");
    cy.get("button").click();

    cy.request({
      method: "POST",
      url: "https://next-backend-example.vercel.app/auth",
      body: {
        email: "example@example.com",
        password: "example2048",
      },
    }).then((response) => {
      expect(response.body).to.have.property("token");
    });
  });
});
