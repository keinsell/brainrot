# This file defines how PyOxidizer application building and packaging is
# performed. See PyOxidizer's documentation at
# https://gregoryszorc.com/docs/pyoxidizer/stable/pyoxidizer.html for details
# of this configuration file format.

def make_exe():
    # Obtain the default PythonDistribution for our build target.
    dist = default_python_distribution()

    # Create a Python packaging policy
    policy = dist.make_python_packaging_policy()

    # Include all Python extension modules
    policy.extension_module_filter = "all"

    # Allow file-based loading for extension modules that can't be loaded from memory
    # This is necessary for modules like PIL._imaging that cannot be loaded from memory
    # Setting resources_location to "filesystem-relative:lib" tells PyOxidizer to load
    # resources from the filesystem relative to a "lib" directory
    policy.resources_location = "filesystem-relative:lib"

    # Explicitly allow file resources to be used
    # This is required for the file-based loading to work correctly
    policy.allow_files = True

    # Include standard library resources
    policy.include_distribution_resources = True

    # Configure the Python interpreter
    python_config = dist.make_python_interpreter_config()

    # Run the main module when the interpreter starts
    python_config.run_module = "__main__"

    # Create the executable
    exe = dist.to_python_executable(
        name="alice",
        packaging_policy=policy,
        config=python_config,
    )

    # Add the project's Python files
    exe.add_python_resources(exe.read_package_root(
        path=".",
        packages=["__main__"],
    ))

    # Add resources directory
    exe.add_python_resources(exe.read_package_root(
        path="resources",
        packages=["resources"],
    ))

    # Add dependencies from requirements
    exe.add_python_resources(exe.pip_install([
        "click>=8.0.0",
        "transformers>=4.0.0",
        "torch>=2.0.0",
        "pathspec>=0.11.0",
        "watchdog>=3.0.0",
        "psutil>=5.9.0",
        "outlines>=0.2.1",
        "click-spinner>=0.1.10",
        "accelerate>=1.4.0",
        "langchain>=0.0.300",
        "langchain-community>=0.0.10",
        "langchain-core>=0.1.0",
        "langchain-huggingface>=0.0.1",
        "chromadb>=0.4.0",
        "sentence-transformers>=2.2.0",
        "rich>=13.7.0",
        "pydantic>=2.10.6",
        "logfire>=3.7.1",
        "optimum>=1.24.0",
        "lru-cache>=0.2.3",
        "pyperclip>=1.9.0",
        "textual>=2.1.2",
        "litellm>=1.34.2",
    ]))

    # Make the executable a console application on Windows
    exe.windows_subsystem = "console"

    return exe

def make_embedded_resources(exe):
    return exe.to_embedded_resources()

def make_install(exe):
    # Create an object that represents our installed application file layout
    files = FileManifest()

    # Add the generated executable to our install layout in the root directory
    files.add_python_resource(".", exe)

    return files

# Platform-specific installers
def make_msi(exe):
    return exe.to_wix_msi_builder(
        "alice",
        "Alice - AI Development Assistant",
        "0.1.0",
        "Alice Project"
    )

# Register targets
register_target("exe", make_exe)
register_target("resources", make_embedded_resources, depends=["exe"], default_build_script=True)
register_target("install", make_install, depends=["exe"], default=True)
register_target("msi_installer", make_msi, depends=["exe"])

# Resolve targets
resolve_targets()
