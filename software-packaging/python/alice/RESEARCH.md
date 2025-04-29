# Alice's Research

## Core Libraries

### LLM Integration
- `llm-chain` - Rust implementation of LangChain-like functionality
- `candle` - Machine learning framework by Hugging Face
- `rig` - Currently used for LLM interactions (as seen in main.rs)
- `kalosm` - Currently used for language processing features

### Task Management & Async Processing
- `tokio` - Asynchronous runtime (already in use)
- `async-trait` - For async trait implementations
- `rayon` - For parallel processing tasks
- `crossbeam` - Concurrent data structures

### Context Management
- `tantivy` - Full-text search and indexing
- `qdrant-client` - Vector database for semantic search
- `rust-bert` - For text embeddings and transformers

### CLI & User Interface
- `clap` - Command line argument parsing
- `indicatif` - Progress bars and indicators (already in use)
- `console` - Terminal coloring and formatting
- `dialoguer` - Interactive user prompts

### Error Handling & Logging
- `miette` - Error reporting (already in use)
- `tracing` - Structured logging
- `sentry` - Error tracking and monitoring

### Storage & Caching
- `sled` - Embedded database
- `redis` - For distributed caching
- `sqlx` - SQL database interactions

### Development Tools
- `criterion` - Benchmarking
- `mockall` - Mocking for tests
- `proptest` - Property-based testing

## Research Links
- https://lib.rs/keywords/llm
- https://github.com/sobelio/llm-chain
- https://github.com/huggingface/candle
- https://rig.rs/learn.html
- https://www.shuttle.dev/blog/2024/06/06/llm-chain-langchain-rust
- https://docs.rs/llm-weaver/latest/llm_weaver
- https://docs.rs/kwaak/latest/kwaak/index.html

## Implementation Notes
1. The core LLM integration should use `rig` and `llm-chain` for flexible model interactions
2. Vector storage with `qdrant` will be crucial for context management
3. Async processing with `tokio` and `rayon` for optimal performance
4. Error handling with `miette` for developer-friendly diagnostics
5. CLI interface using `clap` with `indicatif` for progress indication

## Future Considerations
- Evaluate `rust-bert` for local embeddings generation
- Consider `tantivy` for full-text search capabilities
- Explore `sled` for efficient local storage
