
ServerEvents.recipes(allthemods => {
  allthemods.remove({ id: 'entangled:block' })
  allthemods.remove({ id: 'entangled:item' })
  allthemods.shaped('entangled:block', ['UEU', 'FCG', 'UHU'], {
    U: '#c:ingots/unobtainium',
    E: 'generatorgalore:ender_generator_8x',
    F: 'alltheores:enderium_block',
    G: 'allthecompressed:ender_pearl_block_2x',
    H: 'productivebees:configurable_comb[productivebees:bee_type="productivebees:enderium"]',
    C: 'mekanism:quantum_entangloporter'
  })
  allthemods.shaped('entangled:item', [' EC', ' UE', 'U  '], {
    U: '#c:ingots/unobtainium',
    E: '#c:ender_pearls',
    C: 'mekanism:quantum_entangloporter'
  })
})

