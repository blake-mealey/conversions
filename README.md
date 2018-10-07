# Conversions App

[![Build Status](https://dev.azure.com/chimerical/Conversions/_apis/build/status/conversions-app)](https://dev.azure.com/chimerical/Conversions/_build/latest?definitionId=3)

A web app for converting things.

# Setup

## Requirements

- [Node.js and npm](https://nodejs.org/en/)

## Steps

1. Clone the repo
2. Run `npm install`
3. Run `npm run server:dev`
4. Open [http://localhost:8989](http://localhost:8989) in your browser
5. [Setup ConversionsServer](https://github.com/blake-mealey/ConversionsServer#setup)
6. Update the API URL config/appsettings.json to point to your localhost server

# Feature to-do list

## Converters

- [x] Users can add converters to the list
- [x] Users can remove converters from the list
- [x] Users can choose a converter's unit type
- [x] Users can choose a converter's input unit
- [x] Users can add outputs to a converter
- [x] Users can choose a converter's output's unit
- [x] Users can remove outputs from a converter
- [x] User can enter an input value and it will be converted into the output values
- [x] User can swap input and output if there is only one output
- [ ] User can click a button to copy an output's value to clipboard

## Conversions

- [x] Add basic conversions
- [ ] Add tons of conversions
  - [ ] Support all SI units for each relevant unit type
- [x] Support multiplication conversions
- [ ] Support addition conversions
- [ ] Support binary expression tree conversions
- [ ] Support base conversions (hexadecimal to decimal, etc)

## User management

- [ ] Users can log in using identity providers (e.g. Google)

## Converter lists

- [x] Users can create lists of converters
- [ ] Users can save lists of converters with type, input unit, output units, and input value
  - [ ] Saved lists are associated with the user's account if they are logged in
- [ ] Users can share lists of converters

## User settings

- [ ] Users can view their settings in a popup menu
- [ ] Users can save their settings if logged in
- [ ] Support settings:
  - [ ] Decimal precision
    - [ ] Scientific notation (default)
    - [ ] Decimal points
    - [ ] Max
  - [ ] Theme (light or dark)

## UX

- [ ] Clicking a Material Design button should have a ripple effect
- [ ] Support theming
