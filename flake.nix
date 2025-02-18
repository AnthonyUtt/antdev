{
  description = "Static site generator for AntDev";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    pnpm2nix.url = "github:nzbr/pnpm2nix-nzbr";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs: with inputs;
    flake-utils.lib.eachDefaultSystem (system: 
    let
      pkgs = import nixpkgs { inherit system; };
    in rec {
      packages = {
        site = pkgs.callPackage ./default.nix { inherit pnpm2nix; };
        default = packages.site;
      };
      devShells = {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            nodejs_22.pkgs.pnpm
          ];

          shellHook = ''
            # set up pnpm locally to install latest version
            export PNPM_HOME=$HOME/.pnpm-store
            export PATH=$PNPM_HOME:$PATH

            # install pnpm (should grab latest version to keep lock file up to date)
            pnpm add -g pnpm

            # install deps
            pnpm install

            # clear screen
            clear

            # print MOTD
            echo "Welcome to the AntDev Gatsby flake dev shell!"
            echo "To start the Gatsby development server, run 'pnpm start'"
            echo "To add a new package, run 'pnpm add [--dev] <package-name>'"
            echo
          '';
        };
      };
    }
  );
}
