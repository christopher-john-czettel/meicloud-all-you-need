
ServerEvents.recipes(allthemods => {
 allthemods.remove({id: 'explorerscompass:explorers_compass'})
 allthemods.shaped('explorerscompass:explorerscompass', [
    'NAN',
    'ACA',
    'NAN'
  ], {
    A: 'alltheores:enderium_gear',
    N: 'minecraft:netherite_ingot',
    C: 'minecraft:recovery_compass',
  })
  })

