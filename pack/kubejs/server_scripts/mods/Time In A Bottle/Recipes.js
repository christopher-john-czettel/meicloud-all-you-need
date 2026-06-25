
ServerEvents.recipes(allthemods => {
  allthemods.remove({ id: 'tiab:time_in_a_bottle' })
  allthemods.shaped('tiab:time_in_a_bottle', ['MNO', 'DCD', 'LBP'], {
    D: 'productivelib:upgrade_productivity_4',
    L: 'occultism:iesnium_pickaxe',
    C: 'productivelib:upgrade_time',
    B: 'justdirethings:blazegold_pickaxe',
    M: 'aquaculture:neptunium_pickaxe[aquaculture:in_water=0b]',
    N: 'evilcraft:vengeance_pickaxe[enchantments={levels:{"evilcraft:vengeance":3,"minecraft:fortune":5}}]',
    O: 'ae2:fluix_pickaxe',
    P: 'minecraft:experience_bottle'
  })
})

