# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2019-02-22

### Changed

-   Now targets es5 ecmascript instead of es2017 so that the lib no longer needs
    to go through an additional compilation step for browser targets
    -   I don't believe that this is a breaking change as it only increases the
        number of supported target environments
-   Including source maps for both umd and esm builds
-   Upgraded dev dependencies

## [1.0.0] - 2019-01-03

### Changed

-   Now only checks variables that are defined in the load script, or those that
    are considered to be reserved system or load script variables. Session
    variables are ignored.
-   Numeric identifiers are padded by single underscores on either side instead
    of two
-   All enum identifers in the suggested definition are defined as strings to
    handle whitespace or non `a..z` & `A..Z` characters.
-   Added Caveat section to docs

### Fixed

-   Fixed Variable implementation with incorrect list definition
-   Fixed Capabilities API impl - works now!

## [0.5.0] - 2019-01-01

### Changed

-   Changed name of exported function
-   Updated Docs

### Fixed

-   Fixed incorrect type definition for optional string enum input for
    validation

## [0.4.0] - 2019-01-01

### Fixed

-   Fixed incorrect type definition for optional string enum input for
    validation

### Changed

-   Minor documentation tweaks

## [0.3.0] - 2019-01-01

### Added

-   Documentation
-   Experimental Capabilities (Mashup) API support. It will probably work.

## [0.2.0] - 2019-01-01

### Added

-   Started changelog

### Changed

-   Releases now use `rollup` with two module flavours, `umd` and `esm`,
    specified in the package.json as `main` and `module` respectively.
-   `tsc` output now targets `es2017` instead of `es5` on the assumption that
    users will be using a modern form of node or using their own compilers for
    browser targets.

## [0.1.2] - 2018-12-31

### Changed

-   Updated README.md to reflect project name

## [0.1.1] - 2018-12-31

### Fixed

-   Fixed `matching` boolean on `IdentifierInfo` always being false. Forgot to
    implement simple check.

## [0.1.0] - 2018-12-31

### Added

-   Initial Release
