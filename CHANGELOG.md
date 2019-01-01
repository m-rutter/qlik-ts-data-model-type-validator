# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
