import { cy, describe, before, beforeEach, it, afterEach } from "local-cypress";
import { v4 as uuidv4 } from "uuid";

const username = "devdistrictadmin";
const password = "Coronasafe@123";
const phone_number = "9" + parseInt((Math.random() * 10 ** 9).toString());
const serial_no = parseInt((Math.random() * 10 ** 10).toString());
const qr_id = uuidv4();

describe("Patient Creation", () => {
  before(() => {
    cy.loginByApi(username, password);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.awaitUrl("/");
  });

  it("Create", () => {
    cy.get("a")
      .should("contain", "Facility")
      .contains("Facility")
      .click({ force: true });
    cy.contains("Manage Facility").click();
    cy.contains("Location Management").click();
    cy.contains("Add New Location").click();
    cy.get("[name='name']").type("Test Location");
    cy.get("textarea[name='description']").type("Test Description");
    cy.get("button").contains("Add Location").click();
    cy.verifyNotification("Location created successfully");
    cy.get("[data-cy=back-button]").click();
    cy.get("[data-cy=back-button]").click();
    cy.get("[data-cy=back-button]").click();
    cy.contains("Manage Facility").click();
    cy.contains("Create Asset").click();
    cy.get("#asset-name").type("New Test Asset");
    cy.get("[data-cy=asset-location]").click();
    cy.get("[data-cy=asset-location-1]").click();
    cy.get("[data-cy=asset-type]").click();
    cy.get("[data-cy=asset-type-0]").click();
    cy.get("[data-test=asset-class]").click();
    cy.get("[data-cy=asset-class-1]").click();
    cy.get("#asset-description").type("Test Description");
    cy.get("[data-cy=is_working-0]").click();
    cy.get("#qr_code_id").type(qr_id);
    cy.get("#manufacturer").type("Manufacturer's Name");
    cy.get("#support-name").type("Customer Support's Name");
    cy.get("#support-email").type("email@support.com");
    cy.get("#vendor-name").type("Vendor's Name");
    cy.get("#serial-number").type(serial_no);
    cy.get("#warranty-expiry input").type("25/12/2025");
    cy.get("#last-serviced-on input").type("25/12/2021");
    cy.get("[data-cy=support_phone]").type(phone_number);
    cy.wait(500);
    cy.get("#notes").type("Test note for asset creation!");
    cy.get("#asset-create").click({ force: true });
    cy.verifyNotification("Asset created successfully");
  });

  it("Update", () => {
    cy.visit("/assets");
    cy.get("[data-cy='asset-0']").click();
    cy.get("#update-asset").click();
    cy.get("#asset-name").type(" Updated");
    cy.get("#asset-create").click();
    cy.verifyNotification("Asset updated successfully");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
