
ServerEvents.recipes(allthemods =>{

    allthemods.shaped(
            Item.of('kubejs:allthemodium_solar_sail_package', 1),
            [
                'AAA',
                'APA',
                'AAA'
            ],
            {
                A: '#c:plates/allthemodium',
                P: 'dysoncubeproject:solar_sail_package'
            }
        )

    allthemods.shaped(
            Item.of('kubejs:allthemodium_beam_package', 1),
            [
                ' A ',
                'APA',
                ' A '
            ],
            {
                A: '#c:plates/allthemodium',
                P: 'dysoncubeproject:beam_package'
            }
        )
})

