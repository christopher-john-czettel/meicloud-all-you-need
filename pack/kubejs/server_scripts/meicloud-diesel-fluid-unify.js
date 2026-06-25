// Bridge IE's diesel/crude_oil/lubricant with Create: Diesel Generators'
// equivalent fluids so machines accept either. Tag-based + direct conversion.
ServerEvents.tags('fluid', e => {
    e.add('c:diesel', 'immersiveengineering:diesel')
    e.add('c:diesel', 'createdieselgenerators:diesel')
    e.add('c:crude_oil', 'immersiveengineering:crude_oil')
    e.add('c:crude_oil', 'createdieselgenerators:crude_oil')
    e.add('c:lubricant', 'immersiveengineering:lubricant')
})
