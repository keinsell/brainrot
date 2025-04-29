export NAME := $(shell npm pkg get name | xargs)
export NODE_ENV := production
SHA :=$(shell git rev-parse --short HEAD)

.PHONY: all

all:
	pnpm build
