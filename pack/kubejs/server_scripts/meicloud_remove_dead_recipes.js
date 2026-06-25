// meiCloud — remove broken recipes that reference deleted items / uninstalled mods.
// Replaces the 10 KubeJS recipe-parse errors at boot.

// Belt-and-suspenders: ATM-style runtime remove for recipes that may still parse OK
// in some configs. The datapack stubs in kubejs/data/.../recipe/ are the primary fix.
ServerEvents.recipes(function (event) {
  var ids = [
    'create_things_and_misc:chorus_sail_craft',
    'create_things_and_misc:mangrove_sail_craft_backport',
    'create_things_and_misc:schematic_chair',
    'create_things_and_misc:jaboticaba_sail_craft',
    'create_things_and_misc:raboutan_sail_c_raft',
    'create_things_and_misc:copper_scaffolding_craft',
    'create_mf:cobbled_deepslate_compact_recipe',
    'justenoughbreeding:breeding/iceandfire/lightning_dragon'
  ]
  ids.forEach(function (id) { event.remove({ id: id }) })
})
