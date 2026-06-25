<!-- markdownlint-disable MD013 MD034 -->
# meiCloud — All You Need

![pack icon](pack/icon.png)

A private ATM10-derivative modpack for Minecraft 1.21.1 on NeoForge.

**Status:** v0.2.0 — friends-only. Not seeking general distribution.

## What this is

[All The Mods 10](https://www.curseforge.com/minecraft/modpacks/all-the-mods-10) (v7.0) plus 32 hand-picked additions and 137 mod bumps. The headline is the **aerospace + space chain**:

- Build airships with [Create: Aeronautics](https://modrinth.com/mod/create-aeronautics)
- Mount artillery on them with [Create: Big Cannons](https://www.curseforge.com/minecraft/mc-mods/create-big-cannons)
- Run trains across the world with [Create: Steam'n'Rails](https://modrinth.com/mod/create-steam-n-rails-1.21.1)
- Build rockets and reach orbit with [Creating Space](https://modrinth.com/mod/creating-space)
- Refine oil for diesel-powered generators
- Cross-mod integrations between Mekanism, Create, IE, and AE2

## Install

You need:

1. **[Prism Launcher](https://prismlauncher.org/)** (FOSS, GPLv3)
2. The latest `.mrpack` from [Releases](https://github.com/christopher-john-czettel/meicloud-all-you-need/releases)
3. A copy of Minecraft (purchased + a Microsoft account)
4. To be whitelisted on the server (ask Chris)

Steps:

1. Install Prism Launcher
2. **Add Instance** → **Import** tab → paste the latest `.mrpack` URL → **OK**
3. Press **Play**
4. From the main menu, connect to `atm10.meicloud.net`
5. The first time, AutoModpack will pop up a dialog asking you to accept the server's TLS fingerprint. Click **Accept**.

Done. You never have to re-download an `.mrpack` from this repo again.

## How updates work

Once you've imported v0.2.0 or later, the pack is **self-updating** via AutoModpack:

- We push a mod change to the server.
- You launch Prism, connect to `atm10.meicloud.net`.
- AutoModpack diffs your local mods folder against the server's, downloads any deltas in the background, and restarts the client.
- You're in-game on the latest version.

The only times you'd ever re-import an `.mrpack` are:

- You're setting up a brand-new Prism install
- You want to play singleplayer with the airship build (no server connection = no sync)
- A major rebase ships and we want a clean baseline (rare)

For everything else: just launch and connect.

## Where the wiki lives

Per-mod documentation lives on the private wiki at https://atm10.meicloud.net/wiki/. The pack is deployed against that server.

## House rules (server-side)

- **PvP off** — sword swings on other players do nothing.
- **Mob griefing off** — no creeper craters near builds.
- **Hardcore-ish**: `keepInventory` is off, you lose your stuff on death.
- **8 max players** — friends only, whitelist enforced.

## Built with

- [packwiz](https://packwiz.infra.link/) for the build
- [Prism Launcher](https://prismlauncher.org/) for the launch
- [AutoModpack](https://modrinth.com/mod/automodpack) for in-game mod sync (server → client)
- Mods sourced from [CurseForge](https://www.curseforge.com/) and [Modrinth](https://modrinth.com/)

## License

[MIT](LICENSE) for the pack source (the `pack/` directory, README, KubeJS scripts, branding). Each referenced mod keeps its own license.

## Credits

- The **[All The Mods team](https://github.com/AllTheMods)** for the ATM10 base
- Every mod author — there are 509 of them.
