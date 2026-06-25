
ServerEvents.recipes(allthemods => {
    allthemods.remove({ id: 'the_bumblezone:carvable_wax/from_honeycomb' })
    allthemods.shaped('the_bumblezone:carvable_wax', ['AAA', 'A A', 'AAA'], {
      A: 'productivebees:wax',
    })
  })
  

