
ServerEvents.loaded(event => {
    let $Registries = Java.loadClass("net.minecraft.core.registries.Registries")
    event.server.registryAccess().registryOrThrow($Registries.BIOME).addAlias("biomeswevegone:skyrise_vale", "biomeswevegone:skyris_vale")
})



