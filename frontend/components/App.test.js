import React from 'react'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AppFunctional from './AppFunctional'

let input, submit
let left, right, up, down, reset

const updateStatelessSelectors = document => {
  input = document.querySelector('#email')
  submit = document.querySelector('#submit')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  reset = document.querySelector('#reset')
}

beforeEach(async () => {
  render(<AppFunctional />)
  updateStatelessSelectors(document)
})

// Test 1:
test('Reset Appears', async() => {
  await waitFor(()=>{
    expect(screen.getByText("reset")).toBeVisible()
  })
})

// Test 2:
test('Buttons are loaded in', async() => {
  await waitFor(()=>{
    expect(left).toBeVisible()
    expect(right).toBeVisible()
    expect(up).toBeVisible()
    expect(down).toBeVisible()
    expect(reset).toBeVisible()
  })
})

// Test 3:
test('Email Input logs changes', async() => {
  fireEvent.change(input, {target: {value: 'A'}})
  expect(input.value).toBe('A')
  screen.debug()
})

// Test 4:
test('Reset clears email input', async() => {
  fireEvent.change(input, {target: {value: 'A'}})
  expect(input).toHaveValue('A')
  fireEvent.click(reset)
  await waitFor(()=>{
    expect(input).toHaveValue('')
  })
})

// Test 5:
test('Type invalid email address, then click submit, should give error message', async() => {
  fireEvent.change(input, {target: {value: 'A'}})
  expect(input.value).toBe('A')
  fireEvent.click(submit)
  await waitFor(()=>{
    expect(screen.getByText("Ouch: email must be a valid email")).toBeVisible()
  })
})








// expect(square.textContent).toBe('B')



// test('Email Input Appears'), async()=>{
//   expect(screen.getByText("reset")).toBeVisible()
//   expect(input.toBeVisible())
//   // fireEvent.click(down)
//   screen.debug()
// }

// test('Another Test', async() => {  
//   expect(true).toBe(false)
// })