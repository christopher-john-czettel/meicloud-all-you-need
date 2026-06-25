<!-- markdownlint-disable MD013 MD034 MD041 MD060 -->
# meiCloud — All You Need

![pack icon](pack/icon.png)

A private ATM10-derivative modpack for Minecraft 1.21.1 on NeoForge. Re-skinned, performance-tuned, and shipped as a one-click [`.mrpack`](https://github.com/christopher-john-czettel/meicloud-all-you-need/releases/latest) for [Prism Launcher](https://prismlauncher.org/).

**Status:** v0.2.2 — friends-only, ~25 person whitelist. Not seeking general distribution.

| Quick link | Where |
|---|---|
| 📦 **Latest release** | [GitHub Releases](https://github.com/christopher-john-czettel/meicloud-all-you-need/releases/latest) |
| 🛠 **Install guide (with screenshots)** | [`docs/INSTALL.md`](docs/INSTALL.md) |
| 🎯 **Performance tuning** | [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) |
| 🌐 **Wiki** | [`atm10.meicloud.net/wiki/`](https://atm10.meicloud.net/wiki/) (private) |
| 🚀 **Server** | `ayn.meicloud.net:55565` (pre-populated in `servers.dat`) |

---

## What this is

[All The Mods 10](https://www.curseforge.com/minecraft/modpacks/all-the-mods-10) v7.0 as the base, plus 32 hand-picked additions, 137 mod bumps, and a substantial branding + perf overhaul. The headline addition is the **aerospace + space chain**:

- Build airships with [Create: Aeronautics](https://modrinth.com/mod/create-aeronautics)
- Mount artillery on them with [Create: Big Cannons](https://www.curseforge.com/minecraft/mc-mods/create-big-cannons)
- Run trains across the world with [Create: Steam'n'Rails](https://modrinth.com/mod/create-steam-n-rails-1.21.1)
- Build rockets and reach orbit (Moon, Mars, Venus, orbits) with [Creating Space](https://modrinth.com/mod/creating-space)
- Refine oil for diesel-powered generators with [Create: Diesel Generators](https://modrinth.com/mod/create-diesel-generators)
- Cross-mod integrations between Mekanism, Create, IE, and AE2

There's also **Distant Horizons LOD rendering** at 256-chunk render distance, **BSL + Clrwl shaders** with Create's Colorwheel render-backend support, **EMI** (faster than JEI for index build), **Sable physics**, and the standard ATM10 mod-soup with all the usual QoL.

## What we changed vs. ATM10 base

The pack is fork-aware: the `pack/` directory contains everything we changed, layered over a fresh ATM10 v7.0 base. The biggest deltas by category:

### Branding & polish

- **Surgically re-packed the AllTheTweaks jar** to strip the `TitleWin` mixin (which set the window title to "All The Mods 10"), `NameBrandsOnly` mixin (which added it to the F3-list), and the packaged Mojang-splash + panorama assets. Re-hosted at `pack/local-jars/`, served from `raw.githubusercontent.com`. The mod's actual gameplay (the various small QoL mixins it provides) stays intact.
- **FancyMenu title screen** — custom splash, custom logo, redirected Discord/Akliz/Reddit buttons to our wiki, removed the floating ATM banner above the menu buttons.
- **BCC (Better Compatibility Checker)** modpack name + version updated so server-version checks identify as meiCloud, not ATM.
- **EuphoriaPatcher removed** — needed a base shader we didn't ship and threw errors.

### Performance

- **JVM**: G1GC with `MaxGCPauseMillis=50`, `G1HeapRegionSize=8M`, `+AlwaysPreTouch`, `+ParallelRefProcEnabled`. We tried ZGC; it OOM'd on this exact workload (it needs 30-40 % more heap headroom than G1). Documented in `docs/PERFORMANCE.md`.
- **JEI → EMI swap**. JEI takes ~80 s on the Render thread to build its index after world load, blocking "Loading Terrain". EMI builds incrementally on a worker thread, so the loading screen never waits on it. Swapped 8 JEI ecosystem mods for 7 EMI mods + `extra-mod-integrations` for broad-mod compat.
- **Distant Horizons tuned** — `enableDistantGeneration = false` (avoids worldgen-thread deadlock on world load), 4 threads at 0.5 run-time ratio, 256-chunk gen radius, 5 truly-interior dims (compact machines, AE2 spatial, irons spellbooks pocket, etc.) in `ignoredDimensionCsv`. Space dims (Moon/Mars/Venus/orbits) keep full LODs.
- **SimpleBackups detuned** — was doing a full force-save-all + zip on every world load via a 2-hour timer, freezing the integrated server for ~3 minutes. Now incremental (`MODIFIED_SINCE_LAST`), no force-save (`saveAll = false`), 6-hour timer, daily full backup.
- **ModernFix** tweaks: `dynamic_entity_renderers`, `packet_leak`, `skip_redundant_saves`, `stalled_chunk_load_detection` all enabled.
- **Shader**: BSL_v10.1.1 + Clrwl_1.0.5 (the Colorwheel-team's patched variant with native Create kinetic-rendering support). Tuned `LOW` profile baked into the per-shader settings file. ComplementaryReimagined kept as an alternative; plain BSL, Unbound, and MakeUp UltraFast all dropped (none have Create-Colorwheel support or are redundant with the kept options).
- **Borderless windowed**: Cubes Without Borders 3.0.0 added.
- **Chunky** 1.4.23 added — for the server-side chunk pre-gen workflow (run `/chunky start <world> 0 0 5000` once on the server; DH passively ingests the generated chunks into LOD format).

### Stability / crash fixes

- **`bibliobiomes` removed** — has a `NoSuchFieldError: RuWoodTypes.MAUVE` because `regions_unexplored` renamed the field. Boot-crashes the loader. Other Bibliocraft variants (`bibliocraft`, `bibliowoods`) stay.
- **`creatingspace` re-packed** — version 1.7.18 on NeoForge 21.1.234 had a load-order race: `WindowResizeMixin` fired during `Minecraft.<init>` before the CLIENT config was loaded, crashing on `CSConfigs.CLIENT.oxygenBacktank.sliderPlace.get()`. Stripped `WindowResizeMixin` from the mod's mixin config. Gameplay untouched; only the post-resize repositioning of the O2 overlay is dropped.
- **8 datapack stubs** at `kubejs/data/<mod>/recipe/<id>.json` with `neoforge:false` conditions — silence the original ATM10 recipes that reference deleted-mod items (`unusualend:chorus_nest_planks`, `wildbackport:mangrove_planks`, `nethers_exoticism:*`, `iceandfire:dragonegg_amythest`, `create_things_and_misc:deleted_mod_element`, `merrymaking:ground_ginger`, etc.). The original recipes were error-spamming the KubeJS error log on every boot.
- **3 ATM-specific KubeJS scripts deleted** (`update_checker.js`, `incompatible_versions.js`, `announcements.js`) — all three hit the same `DefaultArtifactVersion → String` `ClassCastException` because of how KubeJS's Rhino fork handles Java type coercion. They polled CurseForge for ATM10 version metadata on every world load; irrelevant for our pack.

### Quality of life

- **EMI Loot, EMI Enchanting, EMIffect, EMI Link (AE2)** — EMI extensions for content JEI never integrated cleanly.
- **`servers.dat` pre-populated** with the `ayn.meicloud.net:55565` server entry, so friends installing the mrpack see the server in their list out of the box.
- **`docs/INSTALL.md`** with Prism screenshots and the exact Java heap + JVM args block.
- **`docs/PERFORMANCE.md`** four-tier optimisation guide (Win11 HAGS / Game Mode / Memory Integrity, AMD Adrenalin per-app profile, NVIDIA equivalent, MC Sodium options, JVM tuning).

### License posture

- **158 ATM-derivative KubeJS scripts** had their original ARR header lines stripped. The actual logic (recipe rebalancing, item unification, Ponder schemes) is retained — same gameplay tweaks the ATM team built, served from a public MIT repo. If the ATM team prefers we strip the logic too, we'll do that; nothing here is shipped commercially.

---

## Install

The short version, with screenshots and JVM-settings tables, is in **[`docs/INSTALL.md`](docs/INSTALL.md)**.

Pre-reqs:

1. **[Prism Launcher](https://prismlauncher.org/)** (FOSS, GPLv3)
2. **A Microsoft account with Minecraft Java Edition** purchased
3. **~25 GB of free disk space** (instance + DH databases + backup headroom)

Three-line summary:

1. Prism → **Add Instance → Import** → paste the [latest `.mrpack` release URL](https://github.com/christopher-john-czettel/meicloud-all-you-need/releases/latest)
2. Wait for the ~1.37 GB download
3. Right-click instance → **Edit → Settings → Java** → set **Memory Min = Max = 16384 MiB** and paste the G1 args block from [`docs/INSTALL.md`](docs/INSTALL.md#step-5--configure-memory-and-jvm-arguments)

Then launch. First-time boot is ~2.5 minutes to the main menu, ~4 minutes to in-world.

## Updating

Right-click the instance → **Edit → Version → Modify Pack** → paste the newest `.mrpack` URL. Prism re-downloads what changed and preserves your saves, screenshots, journeymap data, and Java settings.

## Where the wiki lives

Per-mod documentation is at **[atm10.meicloud.net/wiki/](https://atm10.meicloud.net/wiki/)** (private). The pack is deployed against that server. Wiki is built from public sources (the mods' own docs); access is whitelist-controlled.

## House rules (server-side)

- **PvP off** — sword swings on other players do nothing.
- **Mob griefing off** — no creeper craters near builds.
- **Hardcore-ish**: `keepInventory` is off, you lose your stuff on death.
- **8 max players** — friends only, whitelist enforced.

## Built with

- [packwiz](https://packwiz.infra.link/) — mod resolution + `.mrpack` export
- [Prism Launcher](https://prismlauncher.org/) — instance management
- Mods sourced from [Modrinth](https://modrinth.com/) (primary) and [CurseForge](https://www.curseforge.com/) (for mods unavailable on Modrinth)
- GitHub Actions for `.mrpack` build + GitHub Releases for distribution

## License

[MIT](LICENSE) for the pack source: the `pack/` directory, KubeJS scripts (re-licensed from the ATM-derived originals; original gameplay logic retained, ARR header lines stripped), README, branding, install + performance docs. Each referenced mod keeps its own license. The patched mod jars under `pack/local-jars/` are licensed as the upstream mods license them — modifications are surgical (mixin removal only) and visible in the commit history.

## Credits

- The **[All The Mods team](https://github.com/AllTheMods)** for the ATM10 base — without it this pack wouldn't exist.
- **Every mod author** — there are 506 packwiz-tracked mods in this pack at v0.2.2. Each one is the work of someone we owe a thank-you to.
- **Colorwheel team** ([djefrey/Colorwheel](https://github.com/djefrey/Colorwheel)) for the Create-rendering-backend patched shader variants.
- **ModernFix** ([embeddedt/ModernFix](https://github.com/embeddedt/ModernFix)) for the JVM-and-loading optimisations that make this size of pack viable on consumer hardware.
