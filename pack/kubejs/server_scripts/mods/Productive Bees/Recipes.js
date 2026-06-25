
ServerEvents.recipes(allthemods => {
    allthemods.remove({ output: 'productivelib:upgrade_productivity_4' })
    allthemods.shaped('productivelib:upgrade_productivity_4', [
        'UHU',
        'NBN',
        'UHU'
    ], {
        U: 'productivelib:upgrade_productivity_3',
        B: 'productivelib:upgrade_block',
        H: 'minecraft:heart_of_the_sea',
        N: '#c:nuggets/unobtainium'
    })
})

