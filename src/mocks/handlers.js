import { rest } from 'msw'
import licensesData from './fixtures/licenses.json'
import plansData from './fixtures/plans.json'
import unitPricesData from './fixtures/unitPrices.json'

const base = 'https://app.stage.360monitoring.com' //window.location.origin

export const handlers = [
  rest.get(`${base}/license/plans`, (req, res, ctx) => {
    return res(
      ctx.json(plansData)
    )
  }),
  rest.get(`${base}/license/`, (req, res, ctx) => {
    return res(
      ctx.json(licensesData)
    )
  }),
  rest.get(`${base}/license/properties`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        properties: 10,
        maxProperties: 10
      })
    )
  }),
  rest.post(`${base}/license/upgrade-plan`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        data: []
      })
    )
  }),
  rest.post(`${base}/license/downgrade-plan`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Plan downgraded'
      })
    )
  }),
  rest.post(`${base}/license/upgrade-properties`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Properties upgraded'
      })
    )
  }),
  rest.post(`${base}/license/downgraded-properties`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Properties downgraded'
      })
    )
  }),
  rest.get(`${base}/license/modify-properties/unit-costs/:id`, (req, res, ctx) => {
    const { id } = req.params
    if (id.match(/^\d+$/)) {
      const tryOut = 'ok'
      if (tryOut === 'ok') {
        return res(
          ctx.status(200),
          ctx.json(unitPricesData)
        )
      }
      return res(
        ctx.status(500),
        ctx.json({
          status: 'error',
          message: 'Cannot retrieve properties costs'
        }))
    }
  }),
  rest.post(`${base}/license/modify-properties/preview`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        data: {
          alignmentGrossPrice: 1.09,
          alignmentVatPrice: 0.17,
          alignmentNetPrice: 0.92,
          nextBillingGrossPrice: 1.13,
          nextBillingVatPrice: 0.18,
          nextBillingNetPrice: 0.95,
          currency: 'EUR',
          resultMessage: 'OK',
          nextBillingDate: '2023-04-17',
          changePaymentUrl: 'https://store.plesk.com/1404/scp/s51442806-5pKvp9mXCusR83Pd',
          merchantOfRecordType: 'A'
        }
      })
    )
  }
  ),
  rest.post(`${base}/license/modify-properties`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        'status': 'ok',
        'data': []
      })
    )
  }),
  rest.post(`${base}/license/terminate`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'License terminated'
      })
    )
  }),
  // Profile Endpoints
  rest.delete(`${base}/user/delete`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Account removed'
      })
    )
  }),
  rest.get(`${base}/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access: 'dsfsdfsdfs',
        timezone: 'Europe/Berlin',
        familyName: 'Doe',
        firstName: 'John',
        nickname: 'Doe'
      })
    )
  }),
  rest.put(`${base}/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'Profile updated'
      })
    )
  }),
  rest.post(`${base}/profile/change-password`, (req, res, ctx) => {
    return res(
      ctx.status(409),
      ctx.json({ 'type':'https://symfony.com/errors/validation', 'title':'Validation Failed', 'detail':'password: Password must be at least 8 characters and contain lowercase and uppercase letters, numbers and special characters\npassword: This password has been leaked in a data breach, it must not be used. Please use another password.', 'violations':[{ 'propertyPath':'password', 'title':'Password must be at least 8 characters and contain lowercase and uppercase letters, numbers and special characters', 'parameters':[]}, { 'propertyPath':'password', 'title':'This password has been leaked in a data breach, it must not be used. Please use another password.', 'parameters':[], 'type':'urn:uuid:d9bcdbfe-a9d6-4bfa-a8ff-da5fd93e0f6d' }]})
      // ctx.json({
      //   'status': 'error',
      //   'message': 'Wrong old password'
      // })
    )
  }),
  rest.post(`${base}/consent/set`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'consent updated'
      })
    )
  }),
  rest.get(`${base}/consent/get`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok',
        message: 'current consent received'
      })
    )
  })
]
