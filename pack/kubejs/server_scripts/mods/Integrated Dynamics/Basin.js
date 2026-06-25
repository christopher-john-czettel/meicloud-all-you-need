
ServerEvents.recipes(allthemods => {
  function basin( /** @type {$ItemStack_} */ output, /** @type {$FluidStack_} */ input, /** @type {number} */ duration) {
    let fluidStack = Fluid.of(input)
    let itemStack = Item.of(output)
    allthemods.custom(
      {
        "type": "integrateddynamics:drying_basin",
        "input_fluid": {
          "id": fluidStack.id,
          "amount": fluidStack.amount
        },
        "duration": duration || 300,
        "output_item": {
          "id": itemStack.id,
          "count": itemStack.count
        }
      }
    )
  }

  function mechanicalBasin( /** @type {$ItemStack_} */ output, /** @type {$FluidStack_} */ input, /** @type {number} */ duration) {
    let fluidStack = Fluid.of(input)
    let itemStack = Item.of(output)
    allthemods.custom(
      {
        "type": "integrateddynamics:mechanical_drying_basin",
        "input_fluid": {
          "id": fluidStack.id,
          "amount": fluidStack.amount
        },
        "duration": duration || 30,
        "output_item": {
          "id": itemStack.id,
          "count": itemStack.count
        }
      }
    )
  }

  //basin(output, input, duration)
  basin('xycraft_machines:resin_block', "1B x xycraft_machines:resin")
  //mechanicalBasin(output, input, duration)
  mechanicalBasin('xycraft_machines:resin_block', "1B x xycraft_machines:resin")  
})

