// Big Cannons uses nitre/sulfur for propellant; IE has saltpeter.
// Make either interchangeable via shared tags.
ServerEvents.tags('item', e => {
    e.add('c:dusts/nitre', 'bigcannons:nitre_dust')
    e.add('c:dusts/nitre', 'immersiveengineering:dust_saltpeter')
    e.add('c:dusts/sulfur', 'bigcannons:sulfur_dust')
    e.add('c:dusts/sulfur', 'mekanism:dust_sulfur')
})
