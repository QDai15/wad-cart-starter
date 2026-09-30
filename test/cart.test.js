import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// Tách options ra dùng chung cho gọn
const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  // 405000 (subtotal) + 32400 (VAT) + 30000 (Ship) = 467400
  assert.equal(cartTotal(items, options), 467400)
})

test('empty cart returns 0', () => {
  assert.equal(cartTotal([], options), 0)
})

test('free shipping at the threshold', () => {
  const items = [
    { name: 'Giày', price: 500000, qty: 1 },
  ]
  // Vừa đúng ngưỡng 500k -> Ship = 0.
  // 500000 (subtotal) + 40000 (VAT) + 0 (Ship) = 540000
  assert.equal(cartTotal(items, options), 540000)
})

test('a negative price throws RangeError', () => {
  const items = [
    { name: 'Hàng lỗi', price: -50000, qty: 1 }
  ]
  assert.throws(() => cartTotal(items, options), RangeError)
})

test('a non-integer quantity throws RangeError', () => {
  const items = [
    { name: 'Nước', price: 15000, qty: 1.5 }
  ]
  assert.throws(() => cartTotal(items, options), RangeError)
})