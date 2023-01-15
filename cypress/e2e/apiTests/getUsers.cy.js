let dataArray = []
import Ajv from 'ajv'
const ajv = new Ajv({ allErrors: true, verbose: true }) // options are passed whether all errors are true or not

describe('GET API User Tests', () => {
  let data
  before(
    'load settings.josn data from fixtures folder data so that it can be used throughout',
    () => {
      cy.fixture('settings').then((fixtureData) => {
        data = fixtureData
        cy.log(data.token)
        cy.log(data.baseURL)
      })
    }
  )

  it('GET All Users', () => {
    cy.log(data.token)
    cy.log(data.baseURL)
    cy.request({
      method: 'GET',
      url: data.baseURL + data.path.getAllUsers,
      headers: {
        authorization: 'Bearer ' + data.token,
      },
    }).then((res) => {
      cy.log('RES-> STATUS : ', res.status)
      expect(res.status).to.be.eq(200)
      for (var i = 0; i < res.body.length; i++) {
        dataArray.push(res.body[i].id)
      }
      cy.log(dataArray)
    })
  })

  it('GET User by specific ID', () => {
    for (var i = 0; i < dataArray.length; i++) {
      cy.request({
        method: 'GET',
        url: data.baseURL + data.path.getAllUsers + '/' + dataArray[i],
        headers: {
          authorization: 'Bearer ' + data.token,
        },
      }).then((res) => {
        cy.log('RES-> STATUS : ', res.status)
        expect(res.status).to.be.eq(200)
        cy.log('NAME', res.body.name)
      })
    }
  })

  it('Schema Validation for GET User by specific ID call', () => {
    cy.fixture('getSingleUsersSchema.json').then((jsonSchema) => {
      cy.request({
        method: 'GET',
        url: data.baseURL + data.path.getAllUsers + '/' + dataArray[0],
        headers: {
          authorization: 'Bearer ' + data.token,
        },
      }).then((res) => {
        const validate = ajv.compile(jsonSchema)
        const valid = validate(res.body)
        if (!valid) {
          cy.log(validate.errors).then(() => {
            throw new Error('Schema validation mismacthed')
          })
        }
      })
    })
  })
})
