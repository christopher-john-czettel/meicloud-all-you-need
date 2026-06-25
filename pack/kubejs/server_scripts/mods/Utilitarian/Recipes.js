
ServerEvents.recipes(allthemods => {
    allthemods.shaped('utilitarian:redstone_clock', [' R ', 'RSR', ' R '], {
        R: 'minecraft:redstone',
        S: 'minecraft:chiseled_stone_bricks'
    })

    allthemods.remove({ id: 'utilitarian:tiny_fuel/coal'})
    allthemods.remove({ id: 'utilitarian:tiny_fuel/charcoal'})
})

