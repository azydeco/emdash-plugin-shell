# Publishing a Sandboxed Emdash plugin

## Release checklist

Work through this list for every release of a sandboxed plugin. Each step is explained in more detail below.

- [ ] The Atmosphere account exists, and `publisher` in `emdash-plugin.jsonc` is its DID (see [One-time setup](#one-time-setup)).
- [ ] The release changes are merged to `main`, and your local `main` is checked out, clean and up to date with `origin`.
- [ ] `version` is bumped in `emdash-plugin-example/package.json`. Published versions can't be changed, so every publish needs a new version.
- [ ] `validate` and `bundle` pass without warnings (see [Check the bundle](#check-the-bundle)).
- [ ] `whoami` shows the correct account as the active publisher.
- [ ] Published with `publish`, and the labeler has approved the release (see [Publish](#publish)).
- [ ] The Registry install smoke test passes in the Test site (see [Smoke test](#smoke-test)).

## Where to run the commands

Change directory into the plugin package with `cd emdash-plugin-example`. All of the commands should be run from this directory.

The `emdash-plugin` command reads `emdash-plugin.jsonc` from the current directory.

## What gets published

The Registry shows the package profile and the release, both built from `emdash-plugin.jsonc`:

| Listing field                                        | Source                            |
| ---------------------------------------------------- | --------------------------------- |
| Name, tagline and About                              | `name` and `description`          |
| Description section                                  | `listing/description.md`          |
| Installation section                                 | `listing/installation.md`         |
| Icon                                                 | `icon.png` (256×256 PNG)          |
| Screenshots                                          | `release.artifacts.screenshots`   |
| Permissions                                          | `capabilities` and `allowedHosts` |
| Keywords, author, licence, security contact and repo | the matching manifest fields      |

Profile fields (name, description, keywords, sections, licence, author, security contact) are ignored after the first publish, because the existing profile wins. To change them later without a new release, use `emdash-plugin update-package`.

## One-time setup

Do this before the first publish:

1. Create an Atmosphere account and give it a domain handle.
2. Replace the `publisher` in `emdash-plugin.jsonc` with the account's DID. Prefer the DID to the handle, because the handle can change and the DID can't.
3. Log in:

   ```bash
   pnpm exec emdash-plugin login <handle>      # opens the provider's sign-in page in the browser
   pnpm exec emdash-plugin whoami              # shows the active publisher
   ```

   `login` uses AT Protocol OAuth, so EmDash never sees the password. If `whoami` lists more than one session, use `emdash-plugin switch` to make the one you want active.

> [!CAUTION]
> The first publish ties the slug to the publisher's DID permanently. It can't be moved to another account or renamed afterwards. Check the `slug` and `publisher` before you run `publish` for the first time.

## Check the bundle

```bash
pnpm exec emdash-plugin validate
pnpm exec emdash-plugin bundle
```

`validate` checks the manifest offline. `bundle` builds the plugin and writes the tarball it would publish to `dist/`, without uploading anything. Both should pass without warnings. In particular, `bundle` warns if `icon.png` isn't 256×256.

The Registry's limits are 128 KB per bundled file, 256 KB per bundle, 20,000 bytes per section, 140 graphemes (roughly, characters) for the `description`, 5 keywords, and 1 MiB per listing image.

## Publish

```bash
pnpm exec emdash-plugin whoami   # confirms which account is the active publisher
pnpm exec emdash-plugin publish
```

`publish` rebuilds the bundle, uploads it to the publisher's server, and creates the release record.

Published versions can't be changed. Don't use `--allow-overwrite`: labelers may treat a changed release as a takedown event. If something is wrong with a release, bump the version and publish again.

### Wait for the labeler

The listing doesn't appear at [plugins.emdashcms.com](https://plugins.emdashcms.com) until the Registry's labeler approves the release. `publish` prints a command to follow the checks:

```bash
pnpm exec emdash-plugin info <handle> <slug> --version <version> --watch
```

Until the release is approved, `info` shows only the labeler's current checks.

## Smoke test

Once the listing is live, install it from the Registry into the Test site:

1. Remove `examplePlugin` from `sandboxed: []` in `emdash-site/astro.config.mjs`, so the Signpost page you check is the Registry copy, not the workspace one. Don't commit this change.
2. Start the Test site and log in to the admin.
3. Open the Registry, search for your published plugin, and choose **Install**.
4. Open the "Plugins" page in the admin sidebar. Check that the plugin is listed and any functionality you have added is working.

Then uninstall the Registry copy and restore `astro.config.mjs`.