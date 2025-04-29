{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flakelight.url = "github:nix-community/flakelight";
  inputs.flakelight-darwin.url = "github:cmacrae/flakelight-darwin";
  inputs.napalm.url = "github:nix-community/napalm";
  inputs.napalm.inputs.nixpkgs.follows = "nixpkgs";
  
  outputs =
    {
      flakelight
    , flakelight-darwin
    , napalm
    , nixpkgs
    , ...
    } @ inputs:
    let
      binaryName = "fwa";
      outputs = flakelight ./. {
        inherit inputs;
        imports = [ flakelight-darwin.flakelightModules.default flakelight.flakelightModules.flakelightModule ];
        
        devShell.packages = pkgs: with pkgs; [
          nodejs
          pnpm
          biome
          ocamlPackages.reanalyze
          coreutils
          alejandra
          onefetch
        ];

        package = { stdenv, lib, defaultMeta, nodejs, pnpm, makeWrapper, cacert }:
          stdenv.mkDerivation (finalAttrs: {
            pname = "fucking-web-application";
            version = "0.1.0";
            name = binaryName;
            src = ./.;
            
            nativeBuildInputs = [
              nodejs
              pnpm
              makeWrapper
              cacert
            ];

            buildInputs = [
              nodejs
            ];

            # Configure phase to set up environment
            configurePhase = ''
              export HOME=$(mktemp -d)
              export PNPM_HOME=$HOME/.pnpm
              export PATH=$PNPM_HOME:$PATH
              export NODE_TLS_REJECT_UNAUTHORIZED=0
              export SSL_CERT_FILE=${cacert}/etc/ssl/certs/ca-bundle.crt
              export NODE_EXTRA_CA_CERTS=${cacert}/etc/ssl/certs/ca-bundle.crt
              
              # Install dependencies
              pnpm install --frozen-lockfile
            '';

            # Build phase to compile ReScript and build Next.js app
            buildPhase = ''
              # Build ReScript files first
              pnpm rewatch build || true
              # Then build Next.js app with standalone output
              pnpm next build
            '';

            # Install phase to prepare the final package
            installPhase = ''
              runHook preInstall

              # Create the directory structure
              mkdir -p $out/bin
              mkdir -p $out/libexec/${binaryName}

              # Copy the standalone Next.js build with all files
              cp -r .next/standalone/* $out/libexec/${binaryName}/
              
              # Copy Next.js build files
              mkdir -p $out/libexec/${binaryName}/.next
              cp -r .next/* $out/libexec/${binaryName}/.next/
              
              # Copy public directory
              if [ -d public ]; then
                cp -r public $out/libexec/${binaryName}/
              fi

              # Create cache directory
              mkdir -p $out/libexec/${binaryName}/.next/cache

              # Make server.js executable
              chmod +x $out/libexec/${binaryName}/server.js

              # Create wrapper script
              cat > $out/bin/${binaryName} << EOF
              #!/bin/sh
              cd $out/libexec/${binaryName}
              exec node $out/libexec/${binaryName}/server.js "\$@"
              EOF
              
              chmod +x $out/bin/${binaryName}

              runHook postInstall
            '';

            # Skip shebang patching since we're creating our own wrapper
            postFixup = '''';

            meta = defaultMeta // {
              description = "Next.js application with ReScript support";
              mainProgram = "fwa";
            };
          });

        devShell.shellHook = ''
          export PATH="$PWD/node_modules/.bin:$PATH"
          onefetch
        '';

        formatters = pkgs: {
          "*.js" = "${pkgs.biome}/bin/biome format --write";
          "*.ts" = "${pkgs.biome}/bin/biome format --write";
          "*.tsx" = "${pkgs.biome}/bin/biome format --write";
          "*.json" = "${pkgs.biome}/bin/biome format --write";
        };
      };
    in
      outputs // {
        # Add a service module for NixOS
        nixosModules.default = { config, lib, pkgs, ... }:
          let
            cfg = config.services.fwa;
            package = outputs.packages.${pkgs.system}.default;
          in {
            options.services.fwa = {
              enable = lib.mkEnableOption "fucking-web-application";
              port = lib.mkOption {
                type = lib.types.port;
                default = 3000;
                description = "Port to listen on";
              };
              user = lib.mkOption {
                type = lib.types.str;
                default = binaryName;
                description = "User to run the service as";
              };
              group = lib.mkOption {
                type = lib.types.str;
                default = binaryName;
                description = "Group to run the service as";
              };
            };

            config = lib.mkIf cfg.enable {
              users.users.${cfg.user} = lib.mkIf (cfg.user == binaryName) {
                isSystemUser = true;
                group = cfg.group;
                description = "fucking-web-application service user";
              };

              users.groups.${cfg.group} = lib.mkIf (cfg.group == binaryName) {};

              systemd.services.${binaryName} = {
                description = "fucking-web-application";
                wantedBy = [ "multi-user.target" ];
                after = [ "network.target" ];
                
                serviceConfig = {
                  User = cfg.user;
                  Group = cfg.group;
                  ExecStart = "${package}/bin/${binaryName}";
                  Restart = "always";
                  Environment = [
                    "PORT=${toString cfg.port}"
                    "NODE_ENV=production"
                  ];
                  WorkingDirectory = "${package}/libexec/${binaryName}";
                  StateDirectory = binaryName;
                  CacheDirectory = binaryName;
                };
              };
            };
          };
      };
}
