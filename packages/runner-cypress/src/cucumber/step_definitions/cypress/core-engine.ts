/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

import { Context } from "./_context";
import { A11yReferenceEnum } from "@uuv/a11y";
import { shouldGenerateA11yReport } from "./_.common";

beforeEach(function () {
    cy.wrap(new Context()).as("context");
});

after(function () {
    if (shouldGenerateA11yReport()) {
        return cy.showUvvA11yReport(A11yReferenceEnum.RGAA);
    }
    return null;
});


export function assertTextContent<Subject>(
    response: Subject,
    expectedTextContent: string
) {
    try {
        assert.equal(response[0].textContent, expectedTextContent);
    } catch (e) {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        assert.equal((response[0] as any).value, expectedTextContent);
    }
}

export function findWithRoleAndName(role: string, name: string) {
    findByRoleAndName(role, name);
}

export function findWithRoleAndNameFocused(role: string, name: string) {
    findByRoleAndName(role, name)
        .then(foundElement => {
            cy.focused().then(focusedElement => {
                expect(foundElement?.get(0)).eq(focusedElement?.get(0));
            });
        });
}

export function withinRoleAndName(role: string, name: string) {
    const foundedElement = cy.uuvFindByRole(role, { name, hidden: true })
        .uuvFoundedElement()
        .should("exist");

    return cy.uuvPatchContext({
        withinFocusedElement: foundedElement
    });
}

export function notFoundWithRoleAndName(role: string, name: string) {
    cy.uuvFindByRole(role, { name })
        .should("not.exist");
}

export function findWithRoleAndNameAndContent(expectedRole: string, name: string, expectedTextContent: string) {
    cy.uuvFindByRole(expectedRole, { name })
        .uuvFoundedElement()
        .should("exist")
        .then((response) => {
            assert.equal(response.length, 1);
            assertTextContent(response, expectedTextContent);
        });
}

export function findWithRoleAndNameAndContentDisable(expectedRole: string, name: string, expectedTextContent: string) {
    cy.uuvFindByRole(expectedRole, { name })
        .uuvFoundedElement()
        .should("exist")
        .then((response) => {
            assert.equal(response.length, 1);
            assertTextContent(response, expectedTextContent);
        })
        .invoke("attr", "disabled")
        .should("eq", "disabled");
}

export function findWithRoleAndNameAndContentEnable(expectedRole: string, name: string, expectedTextContent: string) {
    cy.uuvFindByRole(expectedRole, { name })
        .uuvFoundedElement()
        .should("exist")
        .then((response) => {
            assert.equal(response.length, 1);
            assertTextContent(response, expectedTextContent);
        })
        .invoke("attr", "disabled")
        .should("eq", undefined);
}

function findByRoleAndName(role: string, name: string) {
  return cy.uuvFindByRole(role, { name })
   .uuvFoundedElement()
   .should("exist");
}
