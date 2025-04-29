{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flakelight.url = "github:nix-community/flakelight";
    flakelight-darwin.url = "github:cmacrae/flakelight-darwin";
        pyproject-nix = {
      url = "github:pyproject-nix/pyproject.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    uv2nix = {
      url = "github:pyproject-nix/uv2nix";
      inputs.pyproject-nix.follows = "pyproject-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    pyproject-build-systems = {
      url = "github:pyproject-nix/build-system-pkgs";
      inputs.pyproject-nix.follows = "pyproject-nix";
      inputs.uv2nix.follows = "uv2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    flakelight,
    flakelight-darwin,
    ...
  } @ inputs:
    flakelight ./. {
      inherit inputs;
      imports = [flakelight-darwin.flakelightModules.default];

      apps.default = pkgs: {
        type = "app";
        program = pkgs.writeShellScript "alice" ''
          export LD_LIBRARY_PATH=$NIX_LD_LIBRARY_PATH
          ${pkgs.python3}/bin/python ${./.}/__main__.py "$@"
        '';
      };

      devShell = pkgs:
        pkgs.mkShell {
          # Add ncurses for linking during build
          # This is needed because PyOxidizer's Rust build process requires ncurses
          packages = [
            pkgs.hello
            pkgs.coreutils
            pkgs.ruff
            pkgs.ruff-lsp
            pkgs.fira-code
            pkgs.nushell
            pkgs.uv
            pkgs.onefetch
            pkgs.pyright
            pkgs.ncurses
          ];
          shellHook = ''
            export SHELL=${pkgs.nushell}/bin/nu
            # Set environment variables for ncurses
            # Create and activate virtual environment
            uv venv
            uv sync
            source .venv/bin/activate
            clear
            ${pkgs.onefetch}/bin/onefetch
          '';
        };
    };
}
