
ServerEvents.recipes(allthemods => {
    allthemods.custom(
        {
            type: "justdirethings:fluiddrop",
            catalyst: 'actuallyadditions:crystallized_canola_seed',
            id: "atm:crystalized_oil",
            input: {
                Name: "actuallyadditions:refined_canola_oil",
                Properties: {
                    level: "0"
                }
            },
            output: {
                Name: "actuallyadditions:crystallized_oil",
                Properties: {
                    level: "0"
                }
            }
        }
    )

    allthemods.custom(
        {
            type: "justdirethings:fluiddrop",
            catalyst: 'actuallyadditions:empowered_canola_seed',
            id: "atm:empowered_oil",
            input: {
                Name: "actuallyadditions:crystallized_oil",
                Properties: {
                    level: "0"
                }
            },
            output: {
                Name: "actuallyadditions:empowered_oil",
                Properties: {
                    level: "0"
                }
            }
        }
    )
})

