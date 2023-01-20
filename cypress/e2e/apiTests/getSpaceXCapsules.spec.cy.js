/// <reference types="Cypress" />

describe('SpaceX capsule Tests', () => {
  let data
  before('load fixture data', () => {
    cy.fixture('settings.json').then((fixtureData) => {
      data = fixtureData
    })
  })

  it('GET all capsules', () => {
    cy.request({
      method: 'GET',
      url: `${data.spaceX.sapceXBaseUrl}${data.spaceX.path.capsules}`,
    }).then((res) => {
      cy.log('RES -> STATUS : ', res.status)
      expect(res.status).to.be.eq(200)
    })
  })
})
