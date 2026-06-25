
ServerEvents.recipes(allthemods => {

    allthemods.shapeless(' 9x allthemodium:piglich_heart', ['allthemodium:piglich_heart_block']).id('allthemods:allthemodium/heart_decompression')
    allthemods.smithing(
        Item.of('kubejs:silent_allthemodium_plate'),
        '#c:plates/allthemodium',
        'allthemodium:allthemodium_upgrade_smithing_template',
        '#c:ingots/netherite'
    )
    allthemods.smithing(
        Item.of('kubejs:silent_vibranium_plate'),
        '#c:plates/vibranium',
        'allthemodium:vibranium_upgrade_smithing_template',
        '#c:ingots/allthemodium'
    )
    allthemods.smithing(
        Item.of('kubejs:silent_unobtainium_plate'),
        '#c:plates/unobtainium',
        'allthemodium:unobtainium_upgrade_smithing_template',
        '#c:ingots/vibranium'
    )
})

