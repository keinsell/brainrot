# Makefile for building Alice executables using PyInstaller

.PHONY: all windows macos linux all-platforms clean help

# Determine the current platform
UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
    CURRENT_PLATFORM := macos
else ifeq ($(UNAME), Linux)
    CURRENT_PLATFORM := linux
else ifeq ($(UNAME), Windows_NT)
    CURRENT_PLATFORM := windows
else
    CURRENT_PLATFORM := unknown
endif

# Default target: build for current platform
all: clean
	@echo "Building for current platform ($(CURRENT_PLATFORM))..."
	@$(MAKE) $(CURRENT_PLATFORM)

# Build for Windows
windows: clean
	@echo "Building for Windows..."
	@echo "Copying spec file..."
	cp resources/specs/alice-windows.spec alice-windows.spec
	@echo "Building executable..."
	pyinstaller --clean alice-windows.spec
	@echo "Moving executable to dist/windows/..."
	mkdir -p dist/windows
	cp dist/alice.exe dist/windows/
	@echo "Windows build complete."

# Build for macOS
macos: clean
	@echo "Building for macOS..."
	@echo "Copying spec file..."
	cp resources/specs/alice-macos.spec alice-macos.spec
	@echo "Building executable..."
	pyinstaller --clean alice-macos.spec
	@echo "Moving executable to dist/macos/..."
	mkdir -p dist/macos
	cp dist/alice dist/macos/
	@echo "macOS build complete."

# Build for Linux
linux: clean
	@echo "Building for Linux..."
	@echo "Copying spec file..."
	cp resources/specs/alice-linux.spec alice-linux.spec
	@echo "Building executable..."
	pyinstaller --clean alice-linux.spec
	@echo "Moving executable to dist/linux/..."
	mkdir -p dist/linux
	cp dist/alice dist/linux/
	@echo "Linux build complete."

# Build for all platforms
all-platforms: clean
	@echo "Building for all platforms..."
	@echo "Warning: Cross-platform builds may not work correctly."
	@echo "It's recommended to build on each target platform."
	@if [ "$(UNAME)" = "Darwin" ]; then \
		$(MAKE) macos; \
	elif [ "$(UNAME)" = "Linux" ]; then \
		$(MAKE) linux; \
	elif [ "$(UNAME)" = "Windows_NT" ]; then \
		$(MAKE) windows; \
	else \
		echo "Unsupported platform: $(UNAME)"; \
		exit 1; \
	fi
	@echo "All-platforms build complete for current platform."

# Clean build artifacts
clean:
	rm -rf build dist alice-*.spec
	@echo "Cleaned build artifacts"

# Help target
help:
	@echo "Available targets:"
	@echo "  make          - Build for current platform"
	@echo "  make windows  - Build for Windows"
	@echo "  make macos    - Build for macOS"
	@echo "  make linux    - Build for Linux"
	@echo "  make all-platforms - Build for all platforms"
	@echo "  make clean    - Clean build artifacts"
	@echo "  make help     - Show this help message"
