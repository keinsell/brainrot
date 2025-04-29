import importlib.resources as pkg_resources

import click
from rich.console import Console

import resources

console = Console()


def load_resource(filename: str) -> str:
    with pkg_resources.open_text(resources, filename) as f:
        return f.read()


@click.command()
def cli():
    """Alice - AI Development Assistant with local LLM capabilities.

    Starts a REPL (Read-Eval-Print Loop) interface for Alice.

    The REPL provides commands for code generation, refinement, and more.
    Commands:
      - generate: Generate code based on a task description
      - refine: Refine existing code based on feedback
      - chat: Start an interactive chat session
      - agent: Start an interactive session with the agentic assistant
      - model: Set or display the current model
      - help: Show help information
      - exit: Exit the REPL
    """
    # Initialize the inference engine
    console.print("[bold green]Initializing inference engine...[/bold green]")


if __name__ == "__main__":
    cli()
