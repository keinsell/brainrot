pip install vllm
pip install -U "huggingface_hub[cli]"
huggingface-cli download deepseek-ai/deepseek-coder-6.7b-instruct
python -m vllm.entrypoints.openai.api_server --model deepseek-ai/deepseek-coder-6.7b-instruct  --port 42424 --served-model-name deepseek-coder-6b --max-model-len 3000
